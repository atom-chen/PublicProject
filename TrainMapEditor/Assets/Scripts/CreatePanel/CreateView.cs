using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CreateView
{
    public MapData mapData;
    private GameObject settingPanel;
    private GameObject ui;
    private Transform parent;
    private SettingView settingView;
    private List<MapItem> mapItems;
    private CreateCtrl ctrl;
    private SetStyleView setStyleView;

    public CreateView(Transform parent, MapData data)
    {
        ctrl = new CreateCtrl(this);
        this.parent = parent;
        var prefab = Resources.Load<GameObject>("Prefabs/CreatePanel");
        ui = GameObject.Instantiate(prefab, parent);
        if (data == null)
        {
            mapData = new MapData();
            mapData.InitMap();
        }
        else
        {
            mapData = data;
        }

        mapItems = new List<MapItem>();
        CreateMap();
        ctrl.GetStartEndItem(mapItems);
        AddBtnListener();
    }

    public void AddBtnListener()
    {
        ui.transform.Find("SettingPanel/BtnSetting").GetComponent<Button>().onClick.AddListener(() =>
        {
            OpenSettingPanel();
        });

        ui.transform.Find("SettingPanel/BtnOpenStylePanel").GetComponent<Button>().onClick.AddListener(() =>
        {
            OpenSetStylePanel();
        });

        ui.transform.Find("SettingPanel/BtnEmpty").GetComponent<Button>().onClick.AddListener(() =>
        {
            ctrl.SetCurrNodeEmpty();
        });

        ui.transform.Find("SettingPanel/BtnPlayerFill").GetComponent<Button>().onClick.AddListener(() =>
        {
            ctrl.SetCurrNodePlayerFill();
        });

        ui.transform.Find("SettingPanel/BtnSetStart").GetComponent<Button>().onClick.AddListener(() =>
        {
            ctrl.SetStart();
        });

        ui.transform.Find("SettingPanel/BtnSetEnd").GetComponent<Button>().onClick.AddListener(() =>
        {
            ctrl.SetEnd();
        });
    }

    public void CreateMap()
    {
        for (int i = 0; i < mapItems.Count; i++)
        {
            mapItems[i].Destroy();
        }
        mapItems.Clear();
        var prefab = Resources.Load<GameObject>("Prefabs/MapItem");
        for (int i = 0; i < mapData.mapNodes.Count; i++)
        {
            var mapItem = new MapItem(ctrl, GameObject.Instantiate(prefab, ui.transform.Find("GamePanel/MapPanel/MapItems")), mapData.mapNodes[i]);
            mapItems.Add(mapItem);
            mapItem.UpdateBg();
            mapItem.UpdateItem();
        }
    }

    public void OpenSettingPanel() {
        if (settingView != null)
        {
            settingView.OpenPanel(mapData);
        }
        else
        {
            settingView = new SettingView(parent, mapData);
        }
    }

    public void OpenSetStylePanel()
    {
        if (setStyleView == null)
        {
            setStyleView = new SetStyleView(parent, ctrl);
        }
        else
        {
            setStyleView.OpenPanel();
        }

    }

    public void OpenPanel(MapData data)
    {
        if(data == null)
        {
            data = new MapData();
            data.InitMap();
        }
        this.mapData = data;
        ui.SetActive(true);
        CreateMap();
        ctrl.GetStartEndItem(mapItems);
    }

    public void ClosePanel()
    {
        ui.SetActive(false);
        ctrl.Clear();
    }
}
