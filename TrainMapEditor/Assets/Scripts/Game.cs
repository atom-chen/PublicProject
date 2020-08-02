using LitJson;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;

public class Game : MonoBehaviour
{
    public GameObject canvas;
    private static GameObject mainViewGameObject;
    private static CreateView createView;
    private static LoadJsonPanel loadView;

    void Start()
    {
        var prefab = Resources.Load<GameObject>("Prefabs/FacadePanel");
        mainViewGameObject = GameObject.Instantiate(prefab, canvas.transform);
        AddBtnListener();
        
    }

    public void AddBtnListener()
    {
        mainViewGameObject.transform.Find("BtnCreateMap").GetComponent<Button>().onClick.AddListener(() =>
        {
            OpenCreateView();
        });

        mainViewGameObject.transform.Find("BtnReeditorMap").GetComponent<Button>().onClick.AddListener(() =>
        {
            OpenLoadView();
        });
    }

    public void OpenCreateView(MapData data = null)
    {
        if (createView != null)
        {
            createView.OpenPanel(data);
        }
        else
        {
            createView = new CreateView(canvas.transform, data);
        }
        mainViewGameObject.SetActive(false);
    }

    public void OpenLoadView()
    {
        if(loadView != null)
        {
            loadView.OpenPanel();
        }
        else
        {
            loadView = new LoadJsonPanel(canvas.transform, this);
            loadView.OpenPanel();
        }
        mainViewGameObject.SetActive(false);
    }

    public void LoadMission (string missionFileName)
    {
        Debug.Log("加载关卡: " + missionFileName);
        OpenCreateView(Tool.ReadMissionJson(missionFileName));
    }

    public static void BackMainPanel()
    {
        if (createView != null)
        {
            createView.ClosePanel();
        }
        if (loadView != null)
        {
            loadView.ClosePanel();
        }
        mainViewGameObject.SetActive(true);
    }
}
