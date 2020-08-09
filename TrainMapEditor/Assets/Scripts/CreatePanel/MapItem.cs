using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MapItem
{
    public GameObject ui;
    private CreateCtrl ctrl;
    private ItemData itemData;
    private ItemData bgData;
    public NodeData data;

    public MapItem(CreateCtrl ctrl, GameObject ui, NodeData data)
    {
        this.ctrl = ctrl;
        this.ui = ui;
        this.data = data;
        if(data.roadType != -1)
        {
            itemData = ctrl.mapConst.itemConfigs["roadType" + data.roadType]["roadPic" + data.roadPic];
        }
        if (data.bgType != -1)
        {
            bgData = ctrl.mapConst.itemConfigs["bg"]["bgType" + data.bgType];
        }
        AddBtnListener();
        UpdateView();
    }

    public void AddBtnListener()
    {
        ui.transform.Find("ImageBg").GetComponent<Button>().onClick.AddListener(() =>
        {
            ctrl.ChooseNode(this);
        });
    }

    public void UpdateView()
    {
        RectTransform rt = ui.transform as RectTransform;
        rt.anchoredPosition = new Vector2(data.col * 80, data.row * 80);
        ui.name = data.row.ToString() + data.col;
        UpdateChoose(false);
        UpdatePlayerFill();
        UpdateStartEnd();
       // UpdateItemPic();
       // UpdateBg();
    }

    public void UpdateChoose(bool active)
    {
        ui.transform.Find("ImageChoose").gameObject.SetActive(active);
    }

    public void UpdateBg()
    {
        if(data.bgType == -1)
        {
            ui.transform.Find("ImageBg").GetComponent<Image>().color = new Color(0, 0, 0, 0);
        }
        else
        {
            bgData = ctrl.mapConst.itemConfigs["bg"]["bgType" + data.bgType];
            ui.transform.Find("ImageBg").GetComponent<Image>().color = new Color(1, 1, 1, 1);
            ui.transform.Find("ImageBg").GetComponent<Image>().sprite = Resources.Load<Sprite>("Textures/MapNode/" + bgData.pic);
            ui.transform.Find("ImageBg").transform.localEulerAngles = new Vector3(0, 0, bgData.rotateZ);
        }
    }

    public void UpdateBgWithItemData()
    {
        if(bgData == null)
        {
            ui.transform.Find("ImageBg").GetComponent<Image>().color = new Color(0, 0, 0, 0);
        }
        else
        {
            ui.transform.Find("ImageBg").GetComponent<Image>().color = new Color(1, 1, 1, 1);
            ui.transform.Find("ImageBg").GetComponent<Image>().sprite = Resources.Load<Sprite>("Textures/MapNode/" + bgData.pic);
            ui.transform.Find("ImageBg").transform.localEulerAngles = new Vector3(0, 0, bgData.rotateZ);
        }
    }

    public void UpdatePlayerFill()
    {
        if(data.playerFill == true)
        {
            ui.transform.Find("ImagePlayerFill").GetComponent<Image>().color = new Color(1, 1, 1, 1);
        }
        else
        {
            ui.transform.Find("ImagePlayerFill").GetComponent<Image>().color = new Color(1, 1, 1, 0.2f);
        }
    }

    public void UpdateItem()
    {
        if (data.roadType == -1)
        {
            ui.transform.Find("ImageItem").gameObject.SetActive(false);
        }
        else
        {
            itemData = ctrl.mapConst.itemConfigs["roadType" + data.roadType]["roadPic" + data.roadPic];
            ui.transform.Find("ImageItem").gameObject.SetActive(true);
            ui.transform.Find("ImageItem").GetComponent<Image>().sprite = Resources.Load<Sprite>("Textures/MapNode/" + itemData.pic);
            ui.transform.Find("ImageItem").transform.localEulerAngles = new Vector3(0, 0, itemData.rotateZ);
        }
    }

    public void UpdateItemPicWithItemData()
    {
        if(itemData == null)
        {
            ui.transform.Find("ImageItem").gameObject.SetActive(false);
        }
        else
        {
            ui.transform.Find("ImageItem").gameObject.SetActive(true);
            ui.transform.Find("ImageItem").GetComponent<Image>().sprite = Resources.Load<Sprite>("Textures/MapNode/" + itemData.pic);
            ui.transform.Find("ImageItem").transform.localEulerAngles = new Vector3(0, 0, itemData.rotateZ);
        }
    }

    public void UpdateStartEnd()
    {
        ui.transform.Find("ImageStart").gameObject.SetActive(data.start);
        ui.transform.Find("ImageEnd").gameObject.SetActive(data.end);
    }

    public void Destroy()
    {
       GameObject.DestroyImmediate(ui);
    }
}
