using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using LitJson;

public class SettingView
{
    private MapData mapData;
    private Transform parent;
    private GameObject ui;

    public SettingView(Transform parent, MapData data)
    {
        this.parent = parent;
        this.mapData = data;
        var prefab = Resources.Load<GameObject>("Prefabs/BasicSettingPanel");
        ui = GameObject.Instantiate(prefab, parent);
        AddBtnListener();
        UpdateView();
    }

    public void AddBtnListener()
    {
        ui.transform.Find("BtnSave").GetComponent<Button>().onClick.AddListener(() =>
        {
            OnClickSaveData();
            ClosePanel();
        });

        ui.transform.Find("BtnReSave").GetComponent<Button>().onClick.AddListener(() =>
        {
            OnClickReSaveData();
            ClosePanel();
        });

        ui.transform.Find("BtnQuit").GetComponent<Button>().onClick.AddListener(() =>
        {
            OnClickQuit();
            ClosePanel();
        });

        ui.transform.Find("BtnClose").GetComponent<Button>().onClick.AddListener(() =>
        {
            ClosePanel();
        });
    }
    
    public void OnClickSaveData()
    {
        mapData.missionName = ui.transform.Find("InputName").GetComponent<InputField>().text;
        mapData.starTime = int.Parse(ui.transform.Find("InputStarTime").GetComponent<InputField>().text);
        mapData.missionId = int.Parse(ui.transform.Find("InputMissionId").GetComponent<InputField>().text);
        mapData.freeTipTimes = int.Parse(ui.transform.Find("InputFreeTipTimes").GetComponent<InputField>().text);
        mapData.freeRefreshTimes = int.Parse(ui.transform.Find("InputFreeRefreshTimes").GetComponent<InputField>().text);
        mapData.CalcChooseNodes();
        Tool.SaveJsonToFile(JsonMapper.ToJson(mapData), mapData.missionId.ToString());
    }

    public void OnClickReSaveData()
    {
        mapData.missionName = ui.transform.Find("InputName").GetComponent<InputField>().text;
        mapData.starTime = int.Parse(ui.transform.Find("InputStarTime").GetComponent<InputField>().text);
        mapData.missionId = int.Parse(ui.transform.Find("InputMissionId").GetComponent<InputField>().text);
        mapData.freeTipTimes = int.Parse(ui.transform.Find("InputFreeTipTimes").GetComponent<InputField>().text);
        mapData.freeRefreshTimes = int.Parse(ui.transform.Find("InputFreeRefreshTimes").GetComponent<InputField>().text);
        mapData.CalcChooseNodes();
        Tool.ReSaveJsonToFile(JsonMapper.ToJson(mapData), mapData.missionId.ToString());
    }

    public void OnClickQuit()
    {
        Game.BackMainPanel();
    }


    public void UpdateView()
    {
        ui.transform.Find("InputName").GetComponent<InputField>().text = mapData.missionName;
        ui.transform.Find("InputStarTime").GetComponent<InputField>().text = mapData.starTime.ToString();
        ui.transform.Find("InputMissionId").GetComponent<InputField>().text = mapData.missionId.ToString();
        ui.transform.Find("InputFreeTipTimes").GetComponent<InputField>().text = mapData.freeTipTimes.ToString();
        ui.transform.Find("InputFreeRefreshTimes").GetComponent<InputField>().text = mapData.freeRefreshTimes.ToString();
    }


    public void OpenPanel(MapData mapData)
    {
        this.mapData = mapData;
        UpdateView();
        ui.SetActive(true);
    }

    public void ClosePanel()
    {
        ui.SetActive(false);
    }
}
