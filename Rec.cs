using UnityEngine;

public class Rec : MonoBehaviour
{
    public UnityEngine.UI.Image imgComponent;
    public Sprite imagemPlay;
    public Sprite imagemPause;
    private bool recording;

    private void Start()
    {
    }

    public void Toggle(){
        if (recording)
        {
            print("Finalizando rec");
            WebGLRecorder.StopRecord("video");
            imgComponent.sprite = imagemPlay;
        }
        else{
            WebGLRecorder.Record();
            imgComponent.sprite = imagemPause;
        }
        recording = !recording;
    }
}
