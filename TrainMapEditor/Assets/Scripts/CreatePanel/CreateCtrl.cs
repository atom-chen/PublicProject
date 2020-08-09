using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LitJson;
public class CreateCtrl
{
    private MapItem currChoose;
    private MapItem startItem;
    private MapItem endItem;
    private CreateView view;
    public MapConst mapConst;

    public CreateCtrl(CreateView view)
    {
        this.view = view;
        mapConst = new MapConst();
        //Tool.SaveJsonToFile(JsonMapper.ToJson(mapConst.itemConfigs), "mapConst");
    }

    public void GetStartEndItem(List<MapItem> items)
    {
        foreach (var item in items)
        {
            if (item.data.start)
            {
                startItem = item;
            }

            if(item.data.end == true)
            {
                endItem = item;
            }
        }
    }

    public void SetCurrNodeEmpty()
    {
        if (currChoose != null)
        {
            currChoose.data.roadType = -1;
            currChoose.data.roadPic = -1;
            currChoose.data.bgType = -1;
            currChoose.data.playerFill = false;
            currChoose.UpdateBg();
            currChoose.UpdateItem();
            currChoose.UpdatePlayerFill();
        }
    }

    public void SetCurrNodePlayerFill()
    {
        if (currChoose != null)
        {
            currChoose.data.playerFill = !currChoose.data.playerFill;
            currChoose.UpdatePlayerFill();
        }
    }

    public void SetCurrNode(NodeData data)
    {
        if (data.roadType != -1)
        {
            currChoose.data.roadPic = data.roadPic;
            currChoose.data.roadType = data.roadType;
        }
         if(data.bgType != -1)
        {
            currChoose.data.bgType = data.bgType;
        }
        currChoose.UpdateBg();
        currChoose.UpdateItem();
    }

    public void ChooseNode(MapItem item)
    {
        if (currChoose != null)
        {
            currChoose.UpdateChoose(false);
        }
        currChoose = item;

        currChoose.UpdateChoose(true);
    }

    public void SetStart()
    {
        if (startItem != null)
        {
            startItem.data.start = false;
            startItem.UpdateStartEnd();
        }

        if (currChoose!= null)
        {
            currChoose.data.start = true;
        }
        currChoose.UpdateStartEnd();
        startItem = currChoose;
    }

    public void SetEnd()
    {
        if (endItem != null)
        {
            endItem.data.end = false;
            endItem.UpdateStartEnd();
        }

        if (currChoose != null)
        {
            currChoose.data.end = true;
        }
        currChoose.UpdateStartEnd();
        endItem = currChoose;
    }

    public void Clear()
    {
        currChoose = null;
        startItem = null;
        endItem = null;
    }
}
