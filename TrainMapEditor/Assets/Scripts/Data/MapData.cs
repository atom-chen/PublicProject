using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using LitJson;

public class MapData
{
    public string missionName;  //地图名称
    public int missionId;       //地图ID 
    public int starTime;    //多少时间以下获得星数(秒)
    public int freeTipTimes;    //免费提示次数
    public int freeRefreshTimes;    //免费刷新方块次数
    public List<NodeData> mapNodes;  //地图上总共得Nodes  
    public List<NodeData> chooseNodes;  //玩家拖拽轨道池中的Nodes种类

    public MapData()
    {
        missionName = "Default";
        missionId = -1;
        starTime = -1;
        freeTipTimes = 0;
        freeRefreshTimes = 0;
        mapNodes = new List<NodeData>();
        chooseNodes = new List<NodeData>();
    }

    public void InitMap()
    {
        for (int i = 0; i < 9; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                NodeData nodeData = new NodeData();
                nodeData.row = i;
                nodeData.col = j;
                mapNodes.Add(nodeData);
            }
        }
    }

    public void CalcChooseNodes()
    {
        chooseNodes.Clear();
        Dictionary<int, int> useMaps = new Dictionary<int, int>();
        foreach (var item in mapNodes)
        {
            if(item.roadType != -1 && item.playerFill)
            {
                var index = item.roadType * 100 + item.roadPic;
                if (useMaps.ContainsKey(index))
                {
                }
                else
                {
                    useMaps[index] = 1;
                    chooseNodes.Add(item);
                }
            }
        }
    }

    public void CreateJson()
    {
        string json = JsonMapper.ToJson(this);
        Tool.SaveJsonToFile(json, missionId.ToString());
    }

    public override string ToString()
    {
        return string.Format("missionName:{0},missionId:{1},starTime:{2},mapNodes:{3},chooseNodes:{4}, freeTipTimes:{5},freeRefreshTimes:{6}",
            missionName, missionId, starTime, mapNodes, chooseNodes, freeTipTimes, freeRefreshTimes);
    }
}

[SerializeField]
public class NodeData
{
    //格子所在行
    public int row;

    //格子所在列
    public int col;

    //表示当前地面什么类型，
    //1.轨道, 2.河流轨道
    public int roadType;

    public int roadPic;

    public int bgType;

    public int offsetX;   //格子偏移X

    public bool playerFill; //是否是玩家填充

    public bool start;  //是否是起点

    public bool end;    //是否是终点

    public int offsetY;   //格子偏移Y

    public NodeData()
    {
        row = 0;
        col = 0;
        roadType = -1;
        roadPic = -1;
        offsetY = 0;
        offsetX = 0;
        bgType = -1;
        playerFill = false;
        start = false;
        end = false;
    }

    public override string ToString()
    {
        return string.Format("row:{0}, col:{1}, roadType:{2}, roadPic:{3}, offsetX:{4}, offsetY:{5}, playerFill:{6}, bgType:{7}, start:{8}, end:{9}", 
            row, col, roadType, roadPic, offsetX, offsetY, playerFill, bgType, start, end);
    }
}