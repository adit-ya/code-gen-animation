'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronRight,
    Play,
    Pause,
    RotateCcw,
    ChevronDown,
    Zap,
} from 'lucide-react';
import Prism from 'prismjs';

import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php-extras';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';

interface CodeTypewriterProps {
    code: string;
    speed?: number;
    defaultLanguage?: string;
}

const SUPPORTED_LANGUAGES = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'csharp', name: 'C#' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'rust', name: 'Rust' },
    { id: 'go', name: 'Go' },
    { id: 'sql', name: 'SQL' },
    { id: 'bash', name: 'Bash' },
    { id: 'php', name: 'PHP' },
    { id: 'swift', name: 'Swift' },
    { id: 'kotlin', name: 'Kotlin' },
];

const SPEED_PRESETS = [
    { name: 'Slow', value: 100, icon: '🐢' },
    { name: 'Normal', value: 50, icon: '🚶' },
    { name: 'Fast', value: 25, icon: '🏃' },
    { name: 'Super Fast', value: 10, icon: '⚡' },
];

const CodeTypewriter = ({
    code,
    speed = 50,
    defaultLanguage = 'javascript',
}: CodeTypewriterProps) => {
    const [displayedCode, setDisplayedCode] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    const codeRef = useRef<HTMLElement>(null);

    const lines = code.split('\n');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && codeRef.current) {
            const element = codeRef.current;
            element.className = `language-${selectedLanguage}`;
            Prism.highlightElement(element);
        }
    }, [displayedCode, selectedLanguage, isMounted]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isPlaying && currentLine < lines.length) {
            timeout = setTimeout(() => {
                setDisplayedCode((prev) => prev + lines[currentLine] + '\n');
                setCurrentLine((prev) => prev + 1);
            }, currentSpeed);
        }

        return () => clearTimeout(timeout);
    }, [isPlaying, currentLine, lines, currentSpeed]);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleReset = () => {
        setIsPlaying(false);
        setDisplayedCode('');
        setCurrentLine(0);
    };

    const handleLanguageChange = (langId: string) => {
        setSelectedLanguage(langId);
        setIsDropdownOpen(false);
    };

    const handleSpeedChange = (newSpeed: number) => {
        setCurrentSpeed(newSpeed);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className='w-full max-w-4xl mx-auto bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl'>
            <div className='flex items-center justify-between px-4 py-2 bg-[#252526]'>
                <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 rounded-full bg-red-500' />
                    <div className='w-3 h-3 rounded-full bg-yellow-500' />
                    <div className='w-3 h-3 rounded-full bg-green-500' />
                    <div className='relative ml-4'>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='flex items-center space-x-2 text-gray-400 hover:text-white focus:outline-none'
                        >
                            <span className='text-sm'>
                                {
                                    SUPPORTED_LANGUAGES.find(
                                        (lang) => lang.id === selectedLanguage
                                    )?.name
                                }
                            </span>
                            <ChevronDown className='w-4 h-4' />
                        </button>
                        {isDropdownOpen && (
                            <div className='absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-[#1E1E1E] border border-gray-700'>
                                <div className='py-1'>
                                    {SUPPORTED_LANGUAGES.map((language) => (
                                        <button
                                            key={language.id}
                                            onClick={() =>
                                                handleLanguageChange(
                                                    language.id
                                                )
                                            }
                                            className='block w-full px-4 py-2 text-sm text-gray-400 hover:bg-[#2D2D2D] hover:text-white text-left'
                                        >
                                            {language.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex items-center space-x-2 ml-4'>
                        {SPEED_PRESETS.map((preset) => (
                            <button
                                key={preset.value}
                                onClick={() => handleSpeedChange(preset.value)}
                                className={`px-2 py-1 rounded text-sm ${
                                    currentSpeed === preset.value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                                title={`${preset.name} (${preset.value}ms)`}
                            >
                                {preset.icon}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handlePlay}
                        disabled={isPlaying || currentLine >= lines.length}
                        className='p-1 text-gray-400 hover:text-white disabled:opacity-50'
                        aria-label='Play'
                    >
                        <Play className='w-4 h-4' />
                    </button>
                    <button
                        onClick={handlePause}
                        disabled={!isPlaying}
                        className='p-1 text-gray-400 hover:text-white disabled:opacity-50'
                        aria-label='Pause'
                    >
                        <Pause className='w-4 h-4' />
                    </button>
                    <button
                        onClick={handleReset}
                        className='p-1 text-gray-400 hover:text-white'
                        aria-label='Reset'
                    >
                        <RotateCcw className='w-4 h-4' />
                    </button>
                </div>
            </div>

            <div className='p-4 font-mono text-sm overflow-auto min-h-[100vh]'>
                <div className='flex'>
                    <div className='pr-4 text-right text-gray-500 select-none'>
                        {displayedCode.split('\n').map((_, index) => (
                            <div key={index} className='h-6'>
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <div className='flex-1 overflow-x-auto'>
                        <pre>
                            <code ref={codeRef}>{displayedCode}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeTypewriter;
