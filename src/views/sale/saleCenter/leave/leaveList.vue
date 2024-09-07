<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="姓名" prop="leaveName">
        <el-input
          v-model="queryParams.leaveName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工号" prop="leaveStaff">
        <el-input
          v-model="queryParams.leaveStaff"
          placeholder="请输入工号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="leaveType">
        <el-select v-model="queryParams.leaveType" placeholder="请选择类型" clearable>
          <el-option
            v-for="dict in dict.type.sale_leave_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请假开始时间" prop="leaveStartTime">
        <el-date-picker
          v-model="queryParams.leaveStartTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择请假开始时间"
        />
      </el-form-item>
      <el-form-item label="请假结束时间" prop="leaveEndTime">
        <el-date-picker
          v-model="queryParams.leaveEndTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择请假结束时间"
        />
      </el-form-item>
      <el-form-item label="请假说明" prop="leaveDesc">
        <el-input
          v-model="queryParams.leaveDesc"
          placeholder="请输入请假说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请假时长（天）" prop="leaveDuration">
        <el-input
          v-model="queryParams.leaveDuration"
          placeholder="请输入请假时长"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="statusCd">
        <el-input
          v-model="queryParams.statusCd"
          placeholder="请输入状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态时间" prop="statusTime">
        <el-date-picker
          v-model="queryParams.statusTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择状态时间"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createStaff">
        <el-input
          v-model="queryParams.createStaff"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间"
        />
      </el-form-item>
      <el-form-item label="更新人" prop="updateStaff">
        <el-input
          v-model="queryParams.updateStaff"
          placeholder="请输入更新人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedTime">
        <el-date-picker
          v-model="queryParams.updatedTime"
          clearable
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择更新时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sale:leave:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sale:leave:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sale:leave:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sale:leave:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="leaveList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="请假主键" align="center" prop="leaveId" />
      <el-table-column label="姓名" align="center" prop="leaveName" />
      <el-table-column label="工号" align="center" prop="leaveStaff" />
      <el-table-column label="类型" align="center" prop="leaveType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sale_leave_type" :value="scope.row.leaveType" />
        </template>
      </el-table-column>
      <el-table-column label="请假开始时间" align="center" prop="leaveStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.leaveStartTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假结束时间" align="center" prop="leaveEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.leaveEndTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假说明" align="center" prop="leaveDesc" />
      <el-table-column label="请假时长（天）" align="center" prop="leaveDuration" />
      <el-table-column label="状态" align="center" prop="statusCd" />
      <el-table-column label="状态时间" align="center" prop="statusTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.statusTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createStaff" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updateStaff" />
      <el-table-column label="更新时间" align="center" prop="updatedTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['sale:leave:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['sale:leave:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改请假管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="leaveName">
          <el-input v-model="form.leaveName" placeholder="请输入姓名" disabled />
        </el-form-item>
        <el-form-item label="工号" prop="leaveStaff">
          <el-input v-model="form.leaveStaff" placeholder="请输入工号" disabled />
        </el-form-item>
        <el-form-item label="类型" prop="leaveType">
          <el-select v-model="form.leaveType" placeholder="请选择类型">
            <el-option
              v-for="dict in dict.type.sale_leave_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择" prop="leaveStartTime">
          <el-date-picker
            v-model="dateTimeRange"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          />
        </el-form-item>
        <el-form-item label="请假说明" prop="leaveDesc">
          <el-input v-model="form.leaveDesc" placeholder="请输入请假说明" />
        </el-form-item>
        <el-form-item label="请假时长（天）" prop="leaveDuration">
          <el-input v-model="form.leaveDuration" placeholder="请输入请假时长" />
        </el-form-item>
        <el-form-item label="状态" prop="statusCd">
          <el-input v-model="form.statusCd" placeholder="请输入状态" disabled />
        </el-form-item>
        <el-form-item label="状态时间" prop="statusTime">
          <el-date-picker
            v-model="form.statusTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择状态时间"
            disabled
          />
        </el-form-item>
        <el-form-item label="创建人" prop="createStaff">
          <el-input v-model="form.createStaff" placeholder="请输入创建人" disabled />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="form.createTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间"
            disabled
          />
        </el-form-item>
        <el-form-item label="更新人" prop="updateStaff">
          <el-input v-model="form.updateStaff" placeholder="请输入更新人" disabled />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedTime">
          <el-date-picker
            v-model="form.updatedTime"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择更新时间"
            disabled
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLeave, getLeave, delLeave, addLeave, updateLeave } from '@/api/sale/leave/leave'

export default {
  name: 'Leave',
  dicts: ['sale_leave_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 请假管理表格数据
      leaveList: [],
      // 时间选择数组
      dateTimeRange: '',
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        leaveName: null,
        leaveStaff: null,
        leaveType: null,
        leaveStartTime: null,
        leaveEndTime: null,
        leaveDesc: null,
        leaveDuration: null,
        statusCd: null,
        statusTime: null,
        createStaff: null,
        createTime: null,
        updateStaff: null,
        updatedTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询请假管理列表 */
    getList() {
      this.loading = true
      listLeave(this.queryParams).then(response => {
        this.leaveList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      const self = this
      self.open = false
      self.reset()
    },
    // 表单重置
    reset() {
      const self = this
      self.form = {
        leaveId: null,
        leaveName: null,
        leaveStaff: null,
        leaveType: null,
        leaveStartTime: null,
        leaveEndTime: null,
        leaveDesc: null,
        leaveDuration: null,
        statusCd: null,
        statusTime: null,
        createStaff: null,
        createTime: null,
        updateStaff: null,
        updatedTime: null
      }
      self.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      const self = this
      self.queryParams.pageNum = 1
      self.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      const self = this
      self.resetForm('queryForm')
      self.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      const self = this
      self.ids = selection.map(item => item.leaveId)
      self.single = selection.length !== 1
      self.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      const self = this
      self.reset()
      self.open = true
      self.title = '添加请假管理'
      self.form.leaveName = sessionStorage.getItem('nickName')
      self.form.leaveStaff = sessionStorage.getItem('userName')
      self.form.leaveStaff = sessionStorage.getItem('userName')
      self.form.statusCd = '待审批'
      self.form.statusTime = self.dateStrFormat()
      self.form.createStaff = sessionStorage.getItem('userName')
      self.form.createTime = self.dateStrFormat()
      self.form.updateStaff = sessionStorage.getItem('userName')
      self.form.updatedTime = self.dateStrFormat()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const self = this
      self.reset()
      const leaveId = row.leaveId || self.ids
      getLeave(leaveId).then(response => {
        self.form = response.data
        self.open = true
        self.title = '修改请假管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      const self = this
      self.$refs['form'].validate(valid => {
        if (valid) {
          if (self.form.leaveId != null) {
            self.form.leaveStartTime = self.dateTimeRange[0]
            self.form.leaveEndTime = self.dateTimeRange[1]
            updateLeave(self.form).then(response => {
              self.$modal.msgSuccess('修改成功')
              self.open = false
              self.getList()
            })
          } else {
            self.form.leaveStartTime = self.dateTimeRange[0]
            self.form.leaveEndTime = self.dateTimeRange[1]
            addLeave(self.form).then(response => {
              self.$modal.msgSuccess('新增成功')
              self.open = false
              self.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const self = this
      const leaveIds = row.leaveId || self.ids
      self.$modal.confirm('是否确认删除请假管理编号为"' + leaveIds + '"的数据项？').then(function() {
        return delLeave(leaveIds)
      }).then(() => {
        self.getList()
        self.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const self = this
      self.download('sale/leave/export', {
        ...self.queryParams
      }, `leave_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
