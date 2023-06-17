import html2canvas, { Html2CanvasOptions } from 'html2canvas';
import {RefObject} from "react";

const useComponentToImage = (componentRef: RefObject<HTMLElement>) => {
    const downloadImage = () => {
        const captureComponent = async () => {
            const component = componentRef.current;
            if (!component) {
                return;
            }

            try {
                const canvas = await html2canvas(component, { logging: false } as Html2CanvasOptions);
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'Calendar_screenshot.png';
                link.click();
            } catch (error) {
                console.error('html2canvas error:', error);
            }
        };

        captureComponent();
    };

    return downloadImage;
};

export default useComponentToImage;
