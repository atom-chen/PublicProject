using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapConst
{
    public Dictionary<string, Dictionary<string, ItemData>> itemConfigs;

    public MapConst()
    {
        itemConfigs = new Dictionary<string, Dictionary<string, ItemData>>();

        //-----------------------bgtype为1的地图背景节点-------------------------------
        itemConfigs["bg"] = new Dictionary<string, ItemData>();
        itemConfigs["bg"]["bgType1"] = new ItemData("map_zhuangshi_1", 0, 1);    //装饰品树1
        itemConfigs["bg"]["bgType2"] = new ItemData("map_zhuangshi_2", 0, 2);    //装饰品树2
        itemConfigs["bg"]["bgType3"] = new ItemData("map_river_1", 0, 3);        //河岸在上方河流
        itemConfigs["bg"]["bgType4"] = new ItemData("map_river_1", 90, 4);       //河岸在左方河流
        itemConfigs["bg"]["bgType5"] = new ItemData("map_river_1", 180, 5);      //河岸在下方河流
        itemConfigs["bg"]["bgType6"] = new ItemData("map_river_1", 270, 6);      //河岸在右方河流
        itemConfigs["bg"]["bgType7"] = new ItemData("map_river_2", 0, 7);        //左下河弯
        itemConfigs["bg"]["bgType8"] = new ItemData("map_river_2", 90, 8);       //右下河弯
        itemConfigs["bg"]["bgType9"] = new ItemData("map_river_2", 180, 9);      //右上河流弯
        itemConfigs["bg"]["bgType10"] = new ItemData("map_river_2", 270, 10);     //左上河流弯
        itemConfigs["bg"]["bgType11"] = new ItemData("map_zhuanshi_house", 0, 11);     //小房子
        //-----------------------RoadTyppe为1的铁路-----------------------------------
        itemConfigs["roadType1"] = new Dictionary<string, ItemData>();
        itemConfigs["roadType1"]["roadPic1"] = new ItemData("map_road_1", 0, 1, 1);    //左右连接铁路
        itemConfigs["roadType1"]["roadPic2"] = new ItemData("map_road_1", 90, 1, 2);   //上下连接铁路
        itemConfigs["roadType1"]["roadPic3"] = new ItemData("map_road_2", 0, 1, 3);    //下右连接铁路
        itemConfigs["roadType1"]["roadPic4"] = new ItemData("map_road_2", 90, 1, 4);   //上右连接铁路
        itemConfigs["roadType1"]["roadPic5"] = new ItemData("map_road_2", 180, 1, 5);  //上左连接铁路
        itemConfigs["roadType1"]["roadPic6"] = new ItemData("map_road_2", 270, 1, 6);  //左下连接铁路
        itemConfigs["roadType1"]["roadPic7"] = new ItemData("map_road_3", 0, 1, 7);    //上下左右连接铁路
        itemConfigs["roadType1"]["roadPic8"] = new ItemData("map_road_4", 0, 1, 8);    //左上连接右下连接铁路
        itemConfigs["roadType1"]["roadPic9"] = new ItemData("map_road_4", 90, 1, 9);   //左下连接右上连接铁路
        //-----------------------RoadTyppe为2的河流铁路-----------------------------------
        itemConfigs["roadType2"] = new Dictionary<string, ItemData>();
        itemConfigs["roadType2"]["roadPic1"] = new ItemData("map_riverroad_1", 0, 2, 1);    //左右连接河流铁路
        itemConfigs["roadType2"]["roadPic2"] = new ItemData("map_riverroad_1", 90, 2, 2);    //上下连接河流铁路
    }
}

[SerializeField]
public class ItemData
{
    public string pic;

    public int roadType;

    public int roadPic;

    public int bgType;

    public int rotateZ;

    public ItemData(string pic, int rotateZ, int bgType)
    {
        this.pic = pic;
        this.rotateZ = rotateZ;
        this.bgType = bgType;
        this.roadType = -1;
        this.roadPic = -1;
    }

    public ItemData(string pic, int rotateZ, int roadType, int roadPic)
    {
        this.pic = pic;
        this.rotateZ = rotateZ;
        this.roadType = roadType;
        this.roadPic = roadPic;
        this.bgType = -1;
    }

    public ItemData() { }
}
