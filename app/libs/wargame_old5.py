#!/usr/bin/env python
# coding: utf-8

# In[368]:


import pandas as pd

from numpy import *
from random import *

HOSPITAL_LIST = ['大型医院1',
 '大型医院2',
 '大型医院3',
 '大型医院4',
 '大型医院5',
 '大型医院6',
 '大型医院7',
 '大型医院8',
 '大型医院9',
 '大型医院10',
 '大型医院11',
 '大型医院12',
 '大型医院13',
 '大型医院14',
 '大型医院15',
 '大型医院16',
 '大型医院17',
 '大型医院18',
 '大型医院19',
 '中型医院1',
 '中型医院2',
 '中型医院3',
 '中型医院4',
 '中型医院5',
 '中型医院6',
 '中型医院7',
 '中型医院8',
 '中型医院9',
 '中型医院10',
 '中型医院11',
 '中型医院12',
 '中型医院13',
 '中型医院14',
 '中型医院15',
 '中型医院16',
 '中型医院17',
 '中型医院18',
 '中型医院19',
 '中型医院20',
 '小型医院1',
 '小型医院2',
 '小型医院3',
 '小型医院4',
 '小型医院5',
 '小型医院6',
 '小型医院7',
 '小型医院8',
 '小型医院9',
 '小型医院10',
 '小型医院11',
 '小型医院12',
 '小型医院13',
 '小型医院14',
 '小型医院15',
 '小型医院16',
 '小型医院17',
 '小型医院18',
 '小型医院19',
 '小型医院20',
 '小型医院21',
 '小型医院22',
 '小型医院23',
 '小型医院24',
 '小型医院25',
 '私立医院1',
 '私立医院2',
 '私立医院3',
 '私立医院4',
 '私立医院5']



# 计算对某家公司本轮HC决策对份额的影响

def HC_effect(company_df, hospital_id):
    '''
    company_df: 公司表
    hospital_id: 医院ID
    输出：new_share - 该公司经过HC测算后的结算份额
    '''
    
    c = company_df.loc[hospital_id]
    # 本公司在该医院手术台数
    operations = c['年手术台数'] * c['份额'] 
    #每千台HC：
    if operations == 0:
        return 0
    old_hc_per_1000 = c['当前HC'] / (operations/1000)
    new_hc_per_1000 = c['HC决策'] / (operations/1000)
    new_share = c['份额'] 
    if new_hc_per_1000 < 1 and c['份额'] < 0.50:
        gap = old_hc_per_1000 - new_hc_per_1000
        loss = int(gap/0.1)
        # 每损失0.1 ，就丢失1次
        #print("HC份额丢失次数：",loss)
        for i in range(loss):
            # 随机丢失1~10%额度，单位（%）
            new_share *= (1- randrange(1,11)/100)
    #print(operations,old_hc_per_1000,new_hc_per_1000, new_share)
    # counting in the sensitivity of the hospital on HC
    new_share = c['份额'] + (new_share - c['份额']) * c['HC敏感度']
    #print("HC结算后份额：",new_share)
    
    return new_share

# 计算某家公司推广费用对份额的影响（静态）
def Promotion_effect(company_df, hospital_id):
    '''
    company_df : 公司表
    hospital_id: 医院ID
    输出：total_change - 推广费用对医院份额的影响变化百分比
    '''
    c = company_df.loc[hospital_id]
    old_promotion = c['推广费用']
    new_promotion = c['推广决策']
    # 计算推广费用与上轮相比损失多少
    if old_promotion == 0:
        # 当原本在本医院没有投入的时候，推广费用增长按照该公司平均推广费用作为基数计算百分比
        change = new_promotion / company_df['推广费用'].mean() 
    else:
        change = (new_promotion - old_promotion) / old_promotion 
        
    #change = (c['推广决策'] - c['推广费用']) / c['推广费用'] 
    #每比上一周期增加1%， 份额增加0.5%， 每降低1%， 份额丢失1%
    if change > 0:
        total_change = change / 2
    else:
        total_change = change
    #TODO : 需要确定推广费用带来的增益和损失是否有上下限？
    # 推广敏感度带来的增益变化
    #print("渠道份额变化total_change = ", total_change)
    total_change *= c['推广敏感度']
    #print("counting 推广敏感：",total_change)
    
    #渠道牌带来的增益变化:
    if c['渠道牌'] >= 1 and total_change > 0:
        total_change *= 2
        #print("渠道牌变化后：",total_change )
    return total_change

    

# 对一家医院，根据4家公司情况结算份额（HC+推广静态+动态调整）

def Company_Share_Change(hospital_id,company_list):
    #print("____Hospital",hospital_id,"_____")
    static_shares = []
    promotions = []
    for i in range(len(company_list)):
        c = company_list[i]
        #print(c)
        #print("Company:" ,i)
        old_share = c['份额'][hospital_id]
        # 先结算 HC（返回新share)，再结算推广（返回share改变量）
        new_share = HC_effect(c,hospital_id)* (1+ Promotion_effect(c,hospital_id))
        static_shares.append(new_share)
        promotions.append(c['推广决策'][hospital_id])
    #print(static_shares)
    #print(promotions)
    
    final_shares = []
    total_static_share = sum(static_shares)
    total_promotion = sum(promotions)
    for i in range(len(static_shares)):
        new_s = static_shares[i] * 0.8 / total_static_share + promotions[i] * 0.2 / total_promotion 
        final_shares.append(new_s)
    return final_shares
    #print(sum(final_shares)) # should be 1
    
    


# 对于一个产品，计算其份额情况

def product_change(company_df, hospital_id):
    '''
    company_df : 公司表
    hospital_id: 医院ID
    输出：三个数字，表示产品ABC的份额
    '''
    c = company_df.loc[hospital_id]
    pa = c['产品A价格决策']
    pb = c['产品B价格决策']
    #检查策略：产品A，B禁止提价
    if c['产品A价格决策'] > c['产品A价格'] :
        #print("警告！AB产品禁止提价！")
        pa = c['产品A价格']
    if c['产品B价格决策'] > c['产品B价格']:
        pb = c['产品B价格']
        
    # product A
    if c['产品A份额'] == 0:
        if c['准入牌'] >= 1 or pa <= c['产品A均价']*0.9:
            share_A = 0.1
        else:
            share_A = 0
    else:
        share_A = c['产品A份额'] * (1 + ((c['产品A均价']-pa) / c['产品A均价'] / 0.1) * 0.05)
    
    # product B
    share_B = c['产品B份额'] * (1 + ((c['产品B均价']-pb) / c['产品B均价'] / 0.1) * 0.05)
    
    # product C
    share_C = 1-(share_A + share_B)
    
    return (share_A,share_B,share_C,pa,pb,c['产品C价格'])

    

def result_calculate(company_list, company_info, game):
    '''
    主要结算函数，company_list 为公司数据列表，其中每个元素为一个公司表格的dataframe
    company_info为公司信息汇总表，主要是筹码与结算
    game为游戏轮次，一开始为1
    
    输出：company_list , company_info
    
    VBP：从第二轮开始，每家医院一般份额拿出来作为VBP结算，另外一般用原来的方式进行结算
    （据此，份额仅表示非VBP的部分，
    在第二轮之后，非VBP台数 = 医院手术台数*份额*50%，
    VBP台数 = 医院手术台数* VBP份额
    总份额为VBP与非VBP台数相加，除以医院总台数
    
    '''
    
    # Tidy the company_info data
    list_custom = ['长庆', '吉业', '洛华','柳树威']
    company_info['公司名称'] = company_info['公司名称'].astype('category')
    company_info['公司名称'].cat.reorder_categories(list_custom, inplace=True)
    # inplace = True，使 df生效
    company_info.sort_values('公司名称', inplace=True)
    
    # Tidy the company_list
    list_custom = HOSPITAL_LIST
    for c in range(len(company_list)):
        company_list[c]['医院名称'] = company_list[c]['医院名称'].astype('category')
        company_list[c]['医院名称'].cat.reorder_categories(list_custom, inplace=True)
        # inplace = True，使 df生效
        company_list[c].sort_values('医院名称', inplace=True)
    
    
    
    
    game = int(game)
    company_num = len(company_list)
    hospital_num = len(company_list[0])
    
    
    company_info['营收增长比例'] = company_info['营收增长比例'].astype(float)

    new_company_info = company_info.copy()
    #print(new_company_info)
    new_company_list = []

    for x in range(company_num):
        new_company_list.append(company_list[x].copy())


    # 对每家医院，每家企业，更新各企业份额（HC+推广等因素）
    for h in range(hospital_num):
        new_shares = Company_Share_Change(h,company_list)
        for c in range(len(new_shares)):
            #print(h,c)
            new_company_list[c]['份额'][h] = new_shares[c]
    
    #对每家医院，每个企业，更新其三种产品份额
    for h in range(hospital_num):
        for c in range(company_num):
            (share_A,share_B,share_C,pa,pb,pc) = product_change(company_list[c],h)
            new_company_list[c]['产品A价格'][h] = pa
            new_company_list[c]['产品B价格'][h] = pb
            new_company_list[c]['产品C价格'][h] = pc
            new_company_list[c]['产品A份额'][h] = share_A
            new_company_list[c]['产品B份额'][h] = share_B
            new_company_list[c]['产品C份额'][h] = share_C
            # 更新产品台数
            if game == 1:
                new_company_list[c]['产品A台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品A份额'][h] )
                new_company_list[c]['产品B台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品B份额'][h] )
                new_company_list[c]['产品C台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品C份额'][h] )
            else:
                new_company_list[c]['产品A台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品A份额'][h] * 0.5  )
                new_company_list[c]['产品B台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品B份额'][h] * 0.5 )
                new_company_list[c]['产品C台数'][h] = int(new_company_list[c]['年手术台数'][h] * new_company_list[c]['份额'][h] * new_company_list[c]['产品C份额'][h] * 0.5 )
            
            

    # 对每家医院，更新三种产品均价：

    for h in range(hospital_num):
        pa = []
        pb = []
        pc = []
        for c in range(company_num):
            pa.append(new_company_list[c]['产品A价格'][h])
            pb.append(new_company_list[c]['产品B价格'][h])
            pc.append(new_company_list[c]['产品C价格'][h])
    pa_avg = mean(pa)
    pb_avg = mean(pb)
    pc_avg = mean(pc)

    # 更新每张表的产品均价：
    for c in range(company_num):
        new_company_list[c]['产品A均价'] = pa_avg
        new_company_list[c]['产品B均价'] = pb_avg
        new_company_list[c]['产品C均价'] = pc_avg

    # 对每家公司，更新决策相关结果（HC，推广等）
    for c in range(company_num):
        new_company_list[c]['当前HC'] = company_list[c]['HC决策']
        new_company_list[c]['推广费用'] = company_list[c]['推广决策']

        #各种筹码的结算：
        new_company_info['渠道牌剩余数量'][c] = max(0, company_info['渠道牌剩余数量'][c] - sum(company_list[c]['渠道牌']))
        new_company_info['准入牌剩余数量'][c] = max(0, company_info['准入牌剩余数量'][c] - sum(company_list[c]['准入牌']))
        new_company_info['信息牌剩余数量'][c] = max(0, company_info['信息牌剩余数量'][c] - sum(company_list[c]['信息牌']))
        new_company_info['已分配人数'][c] = int(sum(company_list[c]['HC决策']))


        # 开销结算
        cost = sum(company_list[c]['渠道牌']) * company_info['渠道牌价格'][c] 
        cost += sum(company_list[c]['准入牌']) * company_info['准入牌价格'][c]
        cost += sum(company_list[c]['信息牌']) * company_info['信息牌价格'][c]
        cost += (new_company_info['已分配人数'][c] - new_company_info['起始人数'][c]) * company_info['人力成本'][c]
        cost += sum(company_list[c]['推广决策'])

        # 利用开销，结算资金
        new_company_info['总资金'][c] = company_info['总资金'][c] - cost
        new_company_info['总资金投入'][c]+= cost
   
    
        # -----------台数结算：上轮台数 本轮台数 台数增长净值 台数增长比例

        new_company_list[c]['上轮台数']  = company_list[c]['本轮台数']        # 本轮台数挪为上轮台数
        if game < 2:
            #第一轮，没有VBP，台数用份额计算
            new_company_list[c]['本轮台数'] = new_company_list[c]['年手术台数'] * new_company_list[c]['份额']
        else:
            #第二轮之后，使用VBP，台数用两部分计算
            new_company_list[c]['本轮台数'] = new_company_list[c]['年手术台数'] * 0.5 * new_company_list[c]['份额']  + new_company_list[c]['年手术台数'] * 0.5 * company_info['VBP份额'][c]
        # 计算台数增长
        new_company_list[c]['台数增长净值'] = new_company_list[c]['本轮台数'] - new_company_list[c]['上轮台数']
        new_company_list[c]['台数增长比例'] = new_company_list[c]['台数增长净值'] / new_company_list[c]['上轮台数'].map(lambda x:max(x,1))
        
            
        
        
        # -----------------------份额结算：总份额 上轮份额 份额增长净值 份额增长比例, 份额可见
        new_company_list[c]['上轮份额']  = company_list[c]['总份额']        # 本轮台数挪为上轮台数
        if game < 2:
            # 第一轮，没有VBP，份额不变, 总份额即等于份额
            new_company_list[c]['总份额'] = new_company_list[c]['份额']
        else:
            # 第二轮之后，总份额结合VBP计算，看总台数占比
            new_company_list[c]['总份额'] = new_company_list[c]['本轮台数'] / new_company_list[c]['年手术台数']
        # 计算份额增长
        new_company_list[c]['份额增长净值'] = new_company_list[c]['总份额'] - new_company_list[c]['上轮份额']
        new_company_list[c]['份额增长比例'] = new_company_list[c]['份额增长净值'] / new_company_list[c]['上轮份额'].map(lambda x:max(x,1))
            
        
        
        # -----------------------营收结算: 营收 上轮营收 总营收 营收增长净值 营收增长比例
        # 营收方面，表格中的营收一栏挪入上轮营收 
        new_company_info['上轮营收'][c]  = company_info['营收'][c]

        # 营收结算
#         revenueA = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品A份额'] * new_company_list[c]['产品A价格']) / 100
#         revenueB = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品B份额'] * new_company_list[c]['产品B价格'])/ 100
#         revenueC = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品C份额'] * new_company_list[c]['产品C价格'])/ 100
        
        #revenue = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * (new_company_list[c]['产品A份额'] * new_company_list[c]['产品A价格'] + new_company_list[c]['产品B份额'] * new_company_list[c]['产品B价格'] + new_company_list[c]['份额'] * new_company_list[c]['产品C份额'] * new_company_list[c]['产品C价格'])) 
        
        revenue = sum(new_company_list[c]['产品A台数']* new_company_list[c]['产品A价格']) + sum(new_company_list[c]['产品B台数']* new_company_list[c]['产品B价格']) + sum(new_company_list[c]['产品C台数']* new_company_list[c]['产品C价格'])
        

        if game <2 :
            # 第一轮没有VBP，营收为全部产品线营收
            #new_company_info['营收'][c] = revenueA+revenueB+revenueC
            new_company_info['营收'][c] = revenue
        else:
            #第二轮之后有VBP，营收分两部分计算
            normal_income =  revenue * 0.5
            VBP_income = sum(company_info['VBP价格'][c] * company_info['VBP份额'][c] * new_company_list[c]['年手术台数'])
            new_company_info['营收'][c] = normal_income + VBP_income
        
        # 计算总营收、增长：
        new_company_info['总营收'][c] = new_company_info['总营收'][c] + new_company_info['营收'][c]
        new_company_info['营收增长净值'][c] = new_company_info['营收'][c] - new_company_info['上轮营收'][c]
        new_company_info['营收增长比例'][c] = new_company_info['营收增长净值'][c] / new_company_info['上轮营收'][c]

            
        # -------------------------成本结算
#         costA = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品A份额']/100 * new_company_info['产品A成本'][c])
#         costB = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品B份额']/100 * new_company_info['产品B成本'][c])
#         costC = sum(new_company_list[c]['年手术台数'] * new_company_list[c]['份额'] * new_company_list[c]['产品C份额']/100 * new_company_info['产品C成本'][c])
        costA = sum(new_company_list[c]['产品A台数'])* new_company_info['产品A成本'][c]
        costB = sum(new_company_list[c]['产品B台数'])* new_company_info['产品B成本'][c]
        costC = sum(new_company_list[c]['产品C台数'])* new_company_info['产品C成本'][c]


        if game < 2:
            # 第一轮，成本直接核算
            production_cost = costA + costB + costC
        else:
            # 加入VBP后，成本分为VBP部分和非VBP部分
            normal_production_cost = (costA + costB + costC) * 0.5
            VBP_production_cost = sum(new_company_info['产品B成本'][c] * new_company_info['VBP份额'][c] * new_company_list[c]['年手术台数'])
            production_cost = normal_production_cost + VBP_production_cost
        # 加入总生产成本
        new_company_info['总生产成本'][c] += production_cost
   
        # 资金池更新    
        if game%2 == 0: #年底，计算利润，计算下一年资金
            # 总利润 = 总营收 - 生产成本- 资金投入 – 上期人员成本 （不含额外买的人头） 
            profit = new_company_info['总营收'][c] - new_company_info['总生产成本'][c] - new_company_info['总资金投入'][c]
            
            # 营收计入：
            # TODO: 尚未计入利润降幅折扣，因为暂时没有去年利润
            if c == 0:
                gain = new_company_info['总营收'][c] * 0.1
            elif c == 1:
                gain = new_company_info['总营收'][c] * 0.12
            elif c == 2:
                gain = new_company_info['总营收'][c] * 0.15
            else:
                gain = new_company_info['总营收'][c] * 0.16
            
            new_company_info['总资金'][c] = profit + gain
            
            
    # 更新手术台数可见 : 份额可见计算逻辑：如果原来是1，则保留1， 否则如果该公司总份额为各公司最大，则为1，否则为0
    for h in range(hospital_num):
        shares = []
        for c in range(company_num):
            shares.append(new_company_list[c]['总份额'][h])
    
        for c in range(4):
            if new_company_list[c]['总份额'][h] ==  max(shares):
                new_company_list[c]['份额可见'][h] =  1
    

    return (new_company_list, new_company_info)




