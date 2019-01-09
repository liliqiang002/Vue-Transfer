<template>
    <div id="box">
        <div class="box">
            <div class="title">
                <span :class="{active: leftSelect === data1.length}" @click="selectAll(data1)">表2</span>
                <span>{{leftSelect? leftSelect: 0}}/{{data1.length}}</span>
            </div>
            <div @drop="dropPub($event, 2)" @dragover.prevent class="left">
                
                <div 
                @drag="ondrag"
                @dragstart="dragstart($event, item)"
                @dragend="dragend"
                draggable="true" 
                :class="{active: item.isSelect }" 
                v-on:click="hanldleClick(data1, item.id)" 
                v-for="item in data1" 
                :key="item.id">{{item.value}}</div>
            </div>
        </div>
        
        <div class="middle">
            <div v-on:click="moveItem(data1, data2)" :class="{active: leftSelect > 0}">移入</div>
            <div v-on:click="moveItem(data2,data1)" :class="{active: rightSelect > 0}">移除</div>
        </div>
        <div class="box">
            <div class="title">
                <span :class="{active: rightSelect === data2.length}" @click="selectAll(data2)">表2</span>
                <span>{{rightSelect? rightSelect : 0}}/{{data2.length}}</span>
            </div>
            <div @drop="dropPub($event, 1)" @dragover.prevent class="right">
                <div 
                @drag="ondrag" 
                @dragstart="dragstart($event, item)"
                @dragend="dragend"
                draggable="true" 
                :class="{active: item.isSelect }" 
                v-on:click="hanldleClick(data2, item.id)" 
                v-for="item in data2" 
                :key="item.id">{{item.value}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
            data1: [
                {id: 1,value: '项目1', isSelect: false},
                {id: 2,value: '项目2', isSelect: false},
                {id: 3,value: '项目3', isSelect: false},
                {id: 4,value: '项目4', isSelect: false},
                {id: 5,value: '项目5', isSelect: false},
                ],
            data2:[{id: 6,value: '项目6', isSelect: false}],
            target: {
                y: '',
                id: ''
            }
        }
    },
    methods: {
        ondrag(event) {
            this.target.y = event.y
        },
        dropPub (event, type) {
            if (type == 1) {
                this.drop(event,this.data1, this.data2)
            } else {
                this.drop(event,this.data2, this.data1)
            }
        },
        drop (event,handle, target) {            
            let id = event.dataTransfer.getData('id')
            handle.forEach((item,index)=>{
                if (item.id == id) {
                    let temp = handle.splice(index,1)
                    temp[0].isSelect = false
                    target.push(temp[0])
                }
            })
            this.resort(event, target)
                      
        },
        resort (event,target) {
             let eles =event.currentTarget.children          
            for (let i = 0; i < target.length; i++) {
                
                if (target[i].id == this.target.id) {
                    target[i].y = this.target.y
                } else {
                    target[i].y = eles[i].getBoundingClientRect().y
                }
            }
            for (let i = 0; i < target.length-1; i ++) {
                for (let j = 0; j < target.length-i-1; j++ ) {
                    if (target[j].y > target[j+1].y) {
                        let swap = target[j]
                        target[j] = target[j+1]
                        target[j+1] = swap
                    }
                }
            }
            this.$forceUpdate()
        },
        dragstart (event,item) {
            this.target.id = item.id
            event.dataTransfer.setData('id', item.id)
        },
        dragend (event) {
            event.dataTransfer.clearData()
        },
        hanldleClick (data,id) {
            data.forEach(element => {
                if (element.id == id) {
                    element.isSelect = !element.isSelect
                }
            });
        },
        moveItem (handle, target) {
            let temp = handle.filter(item=> {
                return item.isSelect == true
            })
            if (temp.length <=0) return false
            temp.forEach(item=> {
                let index = handle.indexOf(item)
                handle.splice(index,1)
                item.isSelect = false
                target.push(item)
            })
        },
        selectAll (data) {
            let isSelectAll = data.every(item => {
                return item.isSelect == true
            })
            data.forEach(item=> {
                if (isSelectAll) {
                    item.isSelect = false
                } else {
                    item.isSelect = true
                }
                
            })
        }
    },
    
    computed: {
        leftSelect () {
            if (this.data1.length === 0) return false
            let arr =  this.data1.filter(item=> {
                return item.isSelect == true
            })
            return arr.length
        },
        rightSelect () {
            if (this.data2.length == 0) return false
            let arr =  this.data2.filter(item=> {
                return item.isSelect == true
            })
            return arr.length
        },
    }
}
</script>
<style>
* {
        margin: 0;
        padding: 0;
    }
    #box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box .title {
        font-size: 14px;
        box-sizing: border-box;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        width: 200px;
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
    }
    .box .title span:first-child {
        display: inline-block;
        background: #f5f7fa;
         background-image: url(../../public/check-box-outline-blank.png);
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 20px 20px;
        padding-left: 35px;
        cursor: pointer;
    }
    .box .title span:first-child.active {
        background-image: url(../../public/check_box.png);
    }
    .left, .right {
        width: 200px;
        height: 250px;
        border: 1px solid #ebeef5;
        padding: 5px 0;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .left >div , .right > div {
        cursor: pointer;
        text-align: left;
        background-image: url(../../public/check-box-outline-blank.png);
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 20px 20px;
        font-size: 14px;
        padding-left: 35px;
        padding-top: 5px;
        padding-bottom: 5px;
        
    }
    .left >div.active , .right > div.active {
        background-image: url(../../public/check_box.png);
    }
     .middle {
         margin:0 40px;
     }
    .middle > div {
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #dcdfe6;
        font-size: 12px;
        background-color: #f5f7fa;
        color: #c0c4cc;
    }
     .middle > div.active {
        background-color: #409eff;
        border-color: #409eff;
        color: #ffffff;
     }
</style>
