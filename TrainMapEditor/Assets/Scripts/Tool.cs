using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using LitJson;

public class Tool
{
    public static void SaveJsonToFile(string json, string fileName)
    {
        var path = Application.streamingAssetsPath +  "/" + fileName + ".json";
        if (!File.Exists(path))
        {
            File.Create(path).Dispose();
        }
        else
        {
            Debug.LogError("已经存在该地图，请先删除或者修改");
            return;
        }

        File.WriteAllText(path,
        json,
        System.Text.Encoding.UTF8);
    }

    public static void ReSaveJsonToFile(string json, string fileName)
    {
        var path = Application.streamingAssetsPath + "/" + fileName + ".json";
        if (!File.Exists(path))
        {
            File.Create(path).Dispose();
        }

        File.WriteAllText(path,
        json,
        System.Text.Encoding.UTF8);
    }

    public static MapData ReadMissionJson(string jsonName)
    {
        var path = Application.streamingAssetsPath + "/" + jsonName;
        if (!File.Exists(path))
        {
            Debug.LogError("当前加载关卡Json不存在jsonName = " + jsonName);
            return null;
        }
        MapData data = JsonMapper.ToObject<MapData>(File.ReadAllText(path));
        return data;
    }
}