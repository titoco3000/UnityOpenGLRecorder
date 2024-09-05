using System.Runtime.InteropServices;

public class WebGLRecorder
{
    [DllImport("__Internal")]
    public static extern void Record();
    
    [DllImport("__Internal")]
    public static extern void StopRecord(string filename);

    [DllImport("__Internal")]
    public static extern int IsRecordingBlocked();

    [DllImport("__Internal")]
    public static extern float GetRecordingDuration();
}
