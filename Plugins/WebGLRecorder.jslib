mergeInto(LibraryManager.library, {

    Record: function () {
        function internal_rec() {
            var canvas = document.getElementById('unity-canvas'); // Ensure the correct ID is used
            if (canvas) {
                var stream = canvas.captureStream(); // Captures canvas stream
                window.mediaRecorder = new MediaRecorder(stream);
                window.recordedChunks = [];

                window.mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        window.recordedChunks.push(event.data);
                    }
                };

                window.mediaRecorder.start();
            } else {
                // Retry until the canvas is available
                setTimeout(internal_rec, 10);
            }
        }

        internal_rec();
    },

    StopRecord: function (filenamePtr) {
        var filename = UTF8ToString(filenamePtr); // Convert filename from Unity string to JS string

        if (window.mediaRecorder && window.mediaRecorder.state !== "inactive") {
            window.mediaRecorder.stop();

            window.mediaRecorder.onstop = function () {
                var blob = new Blob(window.recordedChunks, { type: 'video/webm' });
                var url = URL.createObjectURL(blob);

                // Create a download link and click it to download the video
                var a = document.createElement('a');
                a.href = url;
                a.download = filename + ".webm";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Clean up recorded data
                window.recordedChunks = [];
                window.mediaRecorder = null;
            };
        } else {
            console.log("No recording in progress.");
        }
    },
    IsRecordingBlocked: function () {
        return window.isRecordingBlocked ? 1 : 0;
    },

    GetRecordingDuration: function () {
        if (window.isRecording) {
            var now = new Date().getTime();
            return ((now - window.recordingStartTime) / 1000); // Time in seconds
        }
        return 0;
    }
});
