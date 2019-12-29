<template>
  <div>
      <!-- 面包屑导航 -->
    <Mbx nav1="订单管理" nav2="订单列表"></Mbx>
    <!-- 卡片视图 -->
    <el-card>
        <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrders">
            <el-button slot="append" icon="el-icon-search" @click="getOrders"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- table表格 -->
    <el-table :data="orderList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="订单编号" prop="order_id"></el-table-column>
      <el-table-column label="订单价格(元)" prop="order_price"></el-table-column>
      <el-table-column label="是否付款" prop="order_pay">
          <template slot-scope="scopes">
          <el-tag type="danger" v-if="scopes.row.order_pay === '0'">未支付</el-tag>
          <el-tag v-if="scopes.row.order_pay === '1'">支付宝</el-tag>
          <el-tag type="success" v-if="scopes.row.order_pay === '2'">微信</el-tag>
          <el-tag type="warning" v-if="scopes.row.order_pay === '3'">银行卡</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"></el-table-column>
      <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scopes">
              {{scopes.row.create_time|dateFormat}}
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template width="170px">
          <el-button type="success" icon="el-icon-location" size="mini" @click="showWL">查看物流进度</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 展示物流进度的对话框 -->
    <el-dialog
    title="物流进度"
    :visible.sync="dialogVisible"
    width="50%">
    <span>
        <!-- timeline时间线 -->
        <el-timeline :reverse="reverse">
            <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
            </el-timeline-item>
        </el-timeline>
    </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      orderList: [],
      total: 0,
      dialogVisible: false,
      progressInfo: [],
      reverse: false
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    async getOrders () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('查询订单列表失败')
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getOrders()
    },
    handleCurrentChange (newpage) {
      // console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getOrders()
    },
    async showWL () {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) return this.$message.error('获取物流信息失败')
      this.progressInfo = res.data
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
