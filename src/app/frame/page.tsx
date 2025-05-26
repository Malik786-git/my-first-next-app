// components/PhotoFrame.tsx
'use client';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './frame.module.scss';

export default function PhotoFrame() {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const transformRef = useRef<any>(null);
    const frameImage = '/frame.png'; // Your frame image path

    // Capture photo from webcam
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) setImgSrc(imageSrc);
    }, []);

    // Handle file upload
    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setImgSrc(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Save composed image
    // components/PhotoFrame.tsx
    const saveImage = async () => {
        if (!transformRef.current || !imgSrc) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to frame dimensions
        canvas.width = 1080;
        canvas.height = 1080;

        // Get current transformation values from instance
        const { instance } = transformRef.current;
        if (!instance) return;

        const { scale, positionX, positionY } = instance.transformState;

        // Draw user image
        const userImage = new Image();
        userImage.src = imgSrc;
        await new Promise(resolve => (userImage.onload = resolve));

        // Calculate image dimensions and position
        const imgWidth = userImage.width * scale;
        const imgHeight = userImage.height * scale;
        const x = (positionX * scale) + (canvas.width / 2) - (imgWidth / 2);
        const y = (positionY * scale) + (canvas.height / 2) - (imgHeight / 2);

        ctx.drawImage(userImage, x, y, imgWidth, imgHeight);

        // Add frame overlay
        const frame = new Image();
        frame.src = frameImage;
        await new Promise(resolve => (frame.onload = resolve));
        ctx.drawImage(frame, 0, 0, 1080, 1080);

        // Trigger download
        const link = document.createElement('a');
        link.download = 'framed-photo.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    };
    // const saveImage = async () => {
    //     if (!transformRef.current || !imgSrc) return;

    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;

    //     // Set canvas size to frame dimensions
    //     canvas.width = 1080;
    //     canvas.height = 1080;

    //     // Get current transformation values
    //     const state = transformRef.current.state;
    //     console.log(transformRef, 'scale');
    //     const scale = state.scale;
    //     const positionX = state.positionX;
    //     const positionY = state.positionY;

    //     // Draw user image
    //     const userImage = new Image();
    //     userImage.src = imgSrc;
    //     await new Promise(resolve => (userImage.onload = resolve));

    //     // Calculate image dimensions and position
    //     const imgWidth = userImage.width * scale;
    //     const imgHeight = userImage.height * scale;
    //     const x = (positionX * scale) + (canvas.width / 2) - (imgWidth / 2);
    //     const y = (positionY * scale) + (canvas.height / 2) - (imgHeight / 2);

    //     ctx.drawImage(userImage, x, y, imgWidth, imgHeight);

    //     // Add frame overlay
    //     const frame = new Image();
    //     frame.src = frameImage;
    //     await new Promise(resolve => (frame.onload = resolve));
    //     ctx.drawImage(frame, 0, 0, 1080, 1080);

    //     // Trigger download
    //     const link = document.createElement('a');
    //     link.download = 'framed-photo.png';
    //     link.href = canvas.toDataURL('image/png', 1.0);
    //     link.click();
    // };


    return (
        <div className={styles.container}>
            {!imgSrc ? (
                <>
                    <div className={styles.frameContainer}>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className={styles.webcamPreview}
                            videoConstraints={{ facingMode: 'environment' }}
                        />
                    </div>
                    <div className={styles.controls}>
                        <button
                            onClick={capture}
                            className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                            Capture Photo
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            className={styles.fileInput}
                            id="upload-input"
                        />
                        <label
                            htmlFor="upload-input"
                            className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                            Upload Photo
                        </label>
                    </div>
                </>
            ) : (
                <div className={styles.frameContainer}>
                    <TransformWrapper
                        ref={transformRef}
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        minScale={0.5}
                        maxScale={3}
                        wheel={{ step: 0.1 }}
                        doubleClick={{ disabled: true }}
                    >
                        <TransformComponent wrapperClass={styles.transformationWrapper}>
                            <img
                                src={imgSrc}
                                alt="Upload"
                                className={styles.webcamPreview}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                    <img
                        src={frameImage}
                        alt="Frame"
                        className={styles.frameOverlay}
                    />
                    <div className={styles.controls}>
                        <button
                            onClick={() => setImgSrc(null)}
                            className={`${styles.button} ${styles.buttonSecondary}`}
                        >
                            Retake
                        </button>
                        <button
                            onClick={saveImage}
                            className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                            Save Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}