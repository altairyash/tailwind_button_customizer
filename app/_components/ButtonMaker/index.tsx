'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.css'
import Slider from '@mui/material/Slider';
import Button from '../Button';
import { blurMarks, radiusMarks } from '../../utils/marks';
import { opacityMarks } from '../../utils/marks';
import { blurMap, borderMap } from '../../utils/maps';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const ButtonMaker = () => {
    const [borderRadius, setBorderRadius] = useState("none");
    const [backgroundImage, setBackgroundImage] = useState('');
    const [blur, setBlur] = useState("sm");
    const [bgOpacity, setBgOpacity] = useState(60);
    const [glass, setGlass] = useState(true);
    const buttonStyle = `rounded-${borderRadius} bg-white p-2 text-black bg-opacity-${bgOpacity} ${glass ? `backdrop-filter backdrop-blur-${blur}` : ""}`
    const extraStyle = " py-2 font-bold"
    const htmlString = `<button class="${buttonStyle}"></button>`;

    const handleBlurSlider = (event: Event, newValue: number | number[]) => {
        setBlur(blurMap[newValue as number]);
    };
    const handleRadiusSlider = (event: Event, newValue: number | number[]) => {
        setBorderRadius(borderMap[newValue as number]);
    };
    const handleOpacitySlider = (event: Event, newValue: number | number[]) => {
        setBgOpacity(newValue as number);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(htmlString)
    }
    const handleBackgroundChange = async () => {
        try {
            // Make a request to the Unsplash API or any other image API
            const response = await axios.get('https://source.unsplash.com/random');
            const imageUrl = response.request.responseURL;

            // Set the selected background image URL in state
            setBackgroundImage(imageUrl);
        } catch (error) {
            console.error('Error fetching background image:', error);
        }
    };
    useEffect(() => {
        handleBackgroundChange()
    }, [])
    return (
        <div className="w-full mx-4 md:mx-0 max-w-[500px] flex flex-col justify-center items-center bg-opacity-50 backdrop-filter backdrop-blur-lg bg-black p-4 rounded-md">
            <h1 className="font-bold text-lg">Button Customizer</h1>
            <div
                className={`px-5 w-full py-6 my-2 rounded-md flex flex-col`}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundColor: `rgba(0, 0, 0, 0.8)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <Button buttonStyle={buttonStyle + extraStyle} />
            </div>
            <button className="text-blue-400 bg-black bg-opacity-80 backdrop-filter backdrop-blur-xs rounded-md p-2 mt-4 font-bold"
                onClick={handleBackgroundChange}
            >
                <ChangeCircleIcon />Background
            </button>
            <div className="w-full mt-4 bg-opacity-50 backdrop-filter backdrop-blur-lg bg-black rounded-lg py-4 p-8">
                <div className="w-full flex text-xs text-gray-300 py-4 pb-8">
                    <span className="grow">{htmlString}</span>
                    <button className="p-2 -mt-2 hover:bg-black rounded-md" onClick={copyToClipboard}><ContentCopyIcon />Copy</button>
                </div>
                <div className='flex flex-col w-full'>
                    <label className=''>Border Radius: {borderRadius}</label>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={0}
                        valueLabelDisplay="off"
                        marks={radiusMarks}
                        step={null}
                        max={70}
                        onChange={handleRadiusSlider}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label className=''>Opacity: {bgOpacity}</label>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={bgOpacity}
                        valueLabelDisplay="off"
                        marks={opacityMarks}
                        step={10}
                        max={100}
                        onChange={handleOpacitySlider}
                    />
                </div>
                <button
                    onClick={() => {
                        setGlass(!glass)
                        setBlur("sm");
                    }}
                    className='flex my-2 items-center'
                >
                    <div className='pr-4'
                    >
                        <span
                            className={`${glass ? "text-blue-600" : "text-gray-500"} flex items-center`}
                        >
                            {glass ? <ToggleOnIcon className=' text-3xl' /> : <ToggleOffIcon className=' text-3xl' />}
                        </span>
                    </div>
                    <div>
                        Glass Morphism
                    </div>
                </button>
                {glass &&
                    <div className='flex flex-col w-full'>
                        <label className=''>Backdrop Blur: {blur}</label>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={10}
                            valueLabelDisplay="off"
                            marks={blurMarks}
                            step={null}
                            max={60}
                            onChange={handleBlurSlider}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
export default ButtonMaker