using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SetStyleView
{
    private GameObject ui;
    private Transform parent;
    private CreateCtrl ctrl;

    public SetStyleView(Transform parent, CreateCtrl ctrl)
    {
        this.parent = parent;
        this.ctrl = ctrl;
        var prefab = Resources.Load<GameObject>("Prefabs/SetItemStylePanel");
        ui = GameObject.Instantiate(prefab, parent);
        UpdateView();
        AddBtnListener();
    }

    public void AddBtnListener()
    {
        ui.transform.Find("BtnClose").GetComponent<Button>().onClick.AddListener(() =>
        {
            ClosePanel();
        });
    }


    public void UpdateView()
    {
        var prefab = Resources.Load<GameObject>("Prefabs/MapItem");
        foreach (var dic in ctrl.mapConst.itemConfigs.Values)
        {
            foreach (var item in dic.Values)
            {
                NodeData nodeData = new NodeData();
                nodeData.roadPic = item.roadPic;
                nodeData.roadType = item.roadType;
                nodeData.bgType = item.bgType;
                nodeData.playerFill = false;
                var mapItem = new MapItem(ctrl, GameObject.Instantiate(prefab, ui.transform.Find("ItemGroup")), nodeData);
                mapItem.ui.transform.Find("ImageBg").GetComponent<Button>().onClick.RemoveAllListeners();
                mapItem.ui.transform.Find("ImageBg").GetComponent<Button>().onClick.AddListener(()=> {
                    ctrl.SetCurrNode(mapItem.data);
                    ClosePanel();
                });
                string name = "";
                if(item.roadType != -1) {
                    name = "roadType:" + item.roadType + "pic:" + item.roadPic;
                }
                else
                {
                    name = "bgType:" + item.bgType;
                }
                mapItem.ui.gameObject.name = name;
                mapItem.UpdateBgWithItemData();
                mapItem.UpdateItemPicWithItemData();
            }
        }
            //var mapItem = new MapItem(ctrl, GameObject.Instantiate(prefab, ui.transform.Find("GamePanel/MapPanel/MapItems")), mapData.mapNodes[i]);
            //mapItems.Add(mapItem);
    }

    public void OpenPanel()
    {
        ui.SetActive(true);
    }

    public void ClosePanel()
    {
        ui.SetActive(false);
    }
}
