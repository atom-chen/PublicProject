//游戏数据操作类
//数据操作结构
var ChapterData = require("ChapterData")
var UserDataMgr = cc.Class({
    extends: cc.Component,

    properties:{
    	playTimes:cc.Integer,//游戏次数
		playerName:"Alex",
	},

	initData:function () {
		cc.Mgr.initData = false;

		//本地存储数据
		//cc.sys.localStorage.removeItem('game_userData');
		var StorageData = cc.sys.localStorage.getItem('game_userData'); //作为一个整体保存起来
		if(StorageData == null || StorageData == "")
		{
			//cc.log("还没有保存过持久数据");
			this.userData = {};
			this.userData.playerName = "";
			this.userData.playTimes = 0;
			this.userData.missionData = {};
			this.playerName = "";
			this.playTimes = 0;
			var id = "";

			for (var k in ChapterData[1].cities){
				var cityData = {
					cityId : ChapterData[1].cities[k].cityId,
					cityName : ChapterData[1].cities[k].cityName,
					star : 0,
					isOpen : k == 1,
					missionNum :ChapterData[1].cities[k].missionNum,
					mission : {},
				};
				for (var i = 1; i <= ChapterData[1].cities[k].missionNum; i++){
					id = i >= 10 && i.toString() || ("0" + i.toString());
					var missionId = ChapterData[1].countryId + ChapterData[1].cities[k].cityId + id;
					var isOpen = k == 1 && i == 1;
					cityData.mission[i] = {
						index : i,
						missionId : missionId,
						star : 0,
						isOpen : isOpen,
					};
				}
				this.userData.missionData[k] = cityData;
			}
			cc.sys.localStorage.setItem('game_userData',JSON.stringify(this.userData));
		}
		else
		{
			//cc.log("有之前保存的持久数据存在");
			this.userData = JSON.parse(StorageData);
			this.playerName = this.userData.playerName;
			this.playTimes = this.userData.playTimes;
		}

		console.log("打印玩家数据", this.userData);
		cc.Mgr.initData = true;
	},

	//保存本地数据
	SaveuserData:function(){
		console.log("保存本地数据", this.userData);
		var userData = this.userData;
		cc.sys.localStorage.setItem('game_userData',JSON.stringify(userData));
	},

	//更新本地数据
	UpdateuserData: function(missionId, star){
		console.log("更新本地数据", missionId, star);
		for (var k1 in this.userData.missionData){
			for (var k2 in this.userData.missionData[k1].mission){
				if (this.userData.missionData[k1].mission[k2].missionId == missionId){
					if (this.userData.missionData[k1].mission[k2].star == 0 && star > 0){
						var nextData = this.userData.missionData[k1].mission[Number(k2) + 1];
						if (nextData != null){
							///下一关开启
							this.userData.missionData[k1].mission[Number(k2) + 1].isOpen = true;
						}
						else
						{
							///下一城市开启
							this.userData.missionData[Number(k1) + 1].isOpen = true;
							this.userData.missionData[Number(k1) + 1].mission[1].isOpen = true;
						}
					}
					///如果通关星数大于记录则修改星星数
					if (star > this.userData.missionData[k1].mission[k2].star){
						///更新城市总星星数
						this.userData.missionData[k1].star += star - this.userData.missionData[k1].mission[k2].star;
						///更新关卡星星数
						this.userData.missionData[k1].mission[k2].star = star
					}
					break;
				}
			}
		}
		this.SaveuserData();
	},

});

module.exports = UserDataMgr
