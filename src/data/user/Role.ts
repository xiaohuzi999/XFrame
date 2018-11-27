/*
* name; 
*/
class Role{
     /**角色ID*/
    public id:string;
    /**唯一ID */
    public uid:any;
    /**角色名*/
    public name:string = "";
    /**等级*/
    public quality:string;
    /**头像*/
    public pic:string = "";
    /**经验*/
    public exp:number = 0;
    /**升级经验*/
    public lvExp:number = 1;
    /**等级*/
    public lv:number = 0;
    /**技能列表*/
    public skills:number[] = [];
    //一级属性===================================================
    /**HP*/
    public hp:number = 1;
    /**最大HP*/
    public maxHp:number = 1;
    /**攻击*/
    public attack:number = 1;
    /**闪避*/
    public dodge:number = 0;
    /**暴击*/
    public crit:number = 0;
    //二级属性==================================================
    /**体质*/
    public physique:number = 0;
    /**敏捷*/
    public agility:number = 0;
    //
    public strength:number = 0;
    /**攻击成长*/
    public strengthGrow:number = 1;
    /**体质成长*/
    public physiqueGrow:number = 0;
    /**敏捷成长*/
    public agilityGrow:number = 0;
    /**速度*/
    public speed:number = 0;
    //装备=============================================
    public weapon:EquipVo = null;
    //服务端逻辑用============================================================
    /**是否NPC，即是否采用AI逻辑*/
    public isNpc:boolean = false;
    /**所在队伍*/
    public fightTeam:number = 0;
    public fightState:number = 0;
    /**怒气值 */
    public power:number = 0;

    /**状态 */
    public state:number = 0;

    /**状态常量-正常 */
    public static readonly NORMAL:number = 0;
    /**状态常量-参战 */
    public static readonly IN_FIGHT:number = 1;

    /**战斗状态常量-正常 */
    public static readonly FS_NORMAL:number = 0;
    /**战斗状态常量-眩晕 */
    public static readonly FS_DIZZY:number = 1;
    /**战斗状态常量-混乱 */
    public static readonly FS_CHAOS:number = 1;

    public constructor(data:any=null) {
        if(data){
            this.setValue(data);
        }
    }

    /**
     *赋值
     * @param valueObj 值对象,JSON格式化对象
     */
    public setValue(valueObj:any) {
        for(var i in valueObj) {
            this[i] = valueObj[i];
        }
    }
}