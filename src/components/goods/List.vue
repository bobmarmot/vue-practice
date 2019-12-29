<template>
  <div>
    <!-- 面包屑导航 -->
    <Mbx nav1="商品管理" nav2="商品列表"></Mbx>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoods">
            <el-button slot="append" icon="el-icon-search" @click="getGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="120px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="95px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="200px">
            <template slot-scope="scopes">
                {{scopes.row.add_time|dateFormat}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template width="170px" slot-scope="scopes">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scopes.row.goods_id)">删除</el-button>
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
      goodsList: [],
      total: 0
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    async getGoods () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('查询商品数据失败')
      //   console.log(res.data)
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getGoods()
    },
    handleCurrentChange (newpage) {
      // console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getGoods()
    },
    async deleteGoods (id) {
      const deleteResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (deleteResult !== 'confirm') {
        this.$message('已取消删除')
      } else {
        const { data: res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200) return this.$message.error('删除商品失败')
        this.getGoods()
      }
    },
    goAddpage () {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
