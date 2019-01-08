<template>
    <div id="box">
        <div class="box">
            <div class="title"><span :class="{active: leftAll}" @click="leftSelectAll">表2</span><span>{{leftSelect}}/{{data1.length}}</span></div>
            <div @drop="dropLeft" @dragover.prevent class="left">
                
                <div 
                @dragstart="dragstartLeft($event, item)"
                @dragend="dragend"
                draggable="true" 
                :class="{active: item.isSelect }" 
                v-on:click="hanldleLeft(item.id)" 
                v-for="item in data1" 
                :key="item.id">{{item.value}}</div>
            </div>
        </div>
        
        <div class="middle">
            <div v-on:click="leftMove" :class="{active: leftCanMove}">移入</div>
            <div v-on:click="rightMove" :class="{active: rightCanMove}">移除</div>
        </div>
        <div class="box">
            <div class="title"><span :class="{active: rightAll}" @click="rightSelectAll">表2</span><span>{{rightSelect}}/{{data2.length}}</span></div>
            <div @drop="dropRight" @dragover.prevent class="right">
                <div 
                @dragstart="dragstartRight($event, item)"
                @dragend="dragend"
                draggable="true" 
                :class="{active: item.isSelect }" 
                v-on:click="hanldleRight(item.id)" 
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
            data2:[{id: 6,value: '项目6', isSelect: false}]
        }
    },
    methods: {
        dropRight (event) {
            let id = event.dataTransfer.getData('id')
            this.data1.forEach((item,index)=>{
                if (item.id == id) {
                    let temp = this.data1.splice(index,1)
                    temp[0].isSelect = false
                    this.data2.push(temp[0])
                }
            })
        },
        dropLeft (event) {
            let id = event.dataTransfer.getData('id')
            this.data2.forEach((item,index)=>{
                if (item.id == id) {
                    let temp = this.data2.splice(index,1)
                    temp[0].isSelect = false
                    this.data1.push(temp[0])
                }
            })
        },
        dragstartLeft (event,item) {
            event.dataTransfer.setData('id', item.id)
        },
        dragstartRight (event,item) {
            event.dataTransfer.setData('id', item.id)
        },
        dragend (event) {
            event.dataTransfer.clearData()
        },
        hanldleLeft(id) {
            this.data1.forEach(element => {
                if (element.id == id) {
                    element.isSelect = !element.isSelect
                }
            });
        },
        leftMove () {
            let temp = this.data1.filter(item=> {
                return item.isSelect == true
            })
            if (temp.length <=0) return false
            temp.forEach(item=> {
                let index = this.data1.indexOf(item)
                this.data1.splice(index,1)
                item.isSelect = false
                this.data2.push(item)
            })
        },
        hanldleRight(id) {
             this.data2.forEach(element => {
                if (element.id == id) {
                    element.isSelect = !element.isSelect
                }
            });
        },
        rightMove () {
            let temp = this.data2.filter(item=> {
                return item.isSelect == true
            })
            if (temp.length <=0) return false
            temp.forEach(item=> {
                let index = this.data2.indexOf(item)
                this.data2.splice(index,1)
                item.isSelect = false
                this.data1.push(item)
            })
        },
        rightSelectAll () {
            this.data2.forEach(item=> {
                item.isSelect = !item.isSelect
            })
        },
        leftSelectAll () {
            this.data1.forEach(item=> {
                item.isSelect = !item.isSelect
            })
        }
    },
    computed: {
        leftCanMove () {
            return this.data1.some(item=> {
                return item.isSelect == true
            })
        },
        leftSelect () {
            let arr =  this.data1.filter(item=> {
                return item.isSelect == true
            })
            return arr.length
        },
        rightCanMove () {
            return this.data2.some(item=> {
                return item.isSelect == true
            }) 
        },
        rightSelect () {
            let arr =  this.data2.filter(item=> {
                return item.isSelect == true
            })
            return arr.length
        },
        leftAll () {
            if (this.data1.length == 0) {
                return false
            } else {
                return this.data1.every(item=> {
                    return item.isSelect == true
                })
            }
            
        },
        rightAll () {
            if (this.data2.length == 0) {
                return false
            } else {
                return this.data2.every(item=> {
                    return item.isSelect == true
                })
            }
            
        }
    }
}
</script>
<style>

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
