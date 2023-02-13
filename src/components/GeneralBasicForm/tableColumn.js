//用于渲染自定义表格组件
const TableColumn = (props) => {
  const{column, scope}=props
  return column.render(scope)
}

TableColumn.props = {
  column: {
    type: Object,
    default: {}
  },
  scope: {
    type: Object,
    default: {}
  }
}

export default TableColumn