using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class LoadJsonPanel
{
    private Game game;
    private Transform parent;
    private GameObject ui;
    private List<GameObject> missionItems;

    public LoadJsonPanel(Transform parent, Game game)
    {
        this.parent = parent;
        this.game = game;
        var prefab = Resources.Load<GameObject>("Prefabs/LoadJson/LoadJsonPanel");
        ui = GameObject.Instantiate(prefab, parent);
        missionItems = new List<GameObject>();
        AddBtnListener();
    }

    public void AddBtnListener()
    {
        ui.transform.Find("BtnQuit").GetComponent<Button>().onClick.AddListener(() =>
        {
            Game.BackMainPanel();
            ClosePanel();
        });
    }

    private void UpdateView()
    {
        DelAllMissionItem();
        AddAllMissionItem();
    }

    private void DelAllMissionItem()
    {
        for (int i = missionItems.Count - 1; i >= 0; i--)
        {
            GameObject.Destroy(missionItems[i]);
        }
        missionItems.Clear();
    }

    private void AddAllMissionItem()
    {
        if (Directory.Exists(Application.streamingAssetsPath))
        {
            DirectoryInfo direction = new DirectoryInfo(Application.streamingAssetsPath);
            FileInfo[] files = direction.GetFiles("*");
            var prefab = Resources.Load<GameObject>("Prefabs/LoadJson/MissionNode");
            for (int i = 0; i < files.Length; i++)
            {
                var file = files[i];
                if (file.Name.EndsWith(".json"))
                {
                    GameObject missionItem = GameObject.Instantiate(prefab, ui.transform.Find("ScrollView/Viewport/Content/MissionPanel"));
                    missionItems.Add(missionItem);
                    missionItem.transform.Find("TextName").GetComponent<Text>().text = file.Name.Split('.')[0];
                    missionItem.transform.Find("Image").GetComponent<Button>().onClick.AddListener(() =>
                    {
                        game.LoadMission(file.Name);
                        ClosePanel();
                    });
                }
            }
        }
        else
        {
            Debug.LogError("不存在StreamingAssets文件夹, 无法读取关卡文件");
        }
    }

    public void ClosePanel()
    {
        ui.SetActive(false);
    }

    public void OpenPanel()
    {
        ui.SetActive(true);
        UpdateView();
    }
}
