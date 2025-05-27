'use client';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styles from './snap-to-win.module.scss';


export default function PhotoFrame() {
    const [captured_img_scr, setCapturedImgSrc] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) setCapturedImgSrc(imageSrc);
    }, []);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setCapturedImgSrc(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const saveImage = () => {
        if (!captured_img_scr) {
            console.error('No image available to save');
            return;
        }

        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = captured_img_scr;

        img.onload = () => {
            canvas.width = 360;
            canvas.height = 450;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Draw image to fill the canvas (similar to object-fit: cover)
                // Calculate aspect ratios
                const imgAspect = img.width / img.height;
                const frameAspect = 360 / 450;

                let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

                if (imgAspect > frameAspect) {
                    // Image is wider than frame
                    drawHeight = 450;
                    drawWidth = drawHeight * imgAspect;
                    offsetX = (drawWidth - 360) / -2;
                } else {
                    // Image is taller than frame
                    drawWidth = 360;
                    drawHeight = drawWidth / imgAspect;
                    offsetY = (drawHeight - 450) / -2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                // Create download link
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'framed-photo.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        };
    };

    return (
        <main className={styles.wrapper}>
            {!captured_img_scr ? (<section>
                <div className={styles.frame_container}>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className={styles.webcam_preview}
                        videoConstraints={{ facingMode: 'user' }}
                    />
                </div>
                <div className={styles.controls}>
                    <button onClick={capture}>Capture Photo</button>
                    <input type="file" accept="image/*" onChange={onFileChange} className={styles.hidden_input} id="upload-input" />
                </div>
            </section>
            ) : (<section>
                <div className={styles.frame_container}>
                    <img src={captured_img_scr} alt="Upload" width={360} height={450} className={styles.captured_img_preview} />
                </div>
                <div className={styles.button_container}>
                    <button onClick={saveImage}>Save Image</button>
                    <button onClick={() => setCapturedImgSrc(null)}>Retake</button>
                </div>
            </section>)}
        </main>
    );
}