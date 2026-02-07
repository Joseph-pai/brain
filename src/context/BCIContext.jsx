import React, { createContext, useContext, useState, useEffect } from 'react';

const BCIContext = createContext();

export function useBCI() {
    return useContext(BCIContext);
}

export function BCIProvider({ children }) {
    const [deviceStatus, setDeviceStatus] = useState('disconnected'); // disconnected, scanning, connected
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [signalQuality, setSignalQuality] = useState(0);

    const connectDevice = () => {
        setDeviceStatus('scanning');
        // Simulate connection delay
        setTimeout(() => {
            setDeviceStatus('connected');
            setBatteryLevel(100);
            setSignalQuality(95);
        }, 2000);
    };

    const disconnectDevice = () => {
        setDeviceStatus('disconnected');
        setBatteryLevel(0);
        setSignalQuality(0);
    };

    // Simulate battery drain
    useEffect(() => {
        let interval;
        if (deviceStatus === 'connected') {
            interval = setInterval(() => {
                setBatteryLevel((prev) => Math.max(0, prev - 1));
            }, 10000); // Drain 1% every 10 seconds
        }
        return () => clearInterval(interval);
    }, [deviceStatus]);

    const value = {
        deviceStatus,
        batteryLevel,
        signalQuality,
        connectDevice,
        disconnectDevice
    };

    return (
        <BCIContext.Provider value={value}>
            {children}
        </BCIContext.Provider>
    );
}
