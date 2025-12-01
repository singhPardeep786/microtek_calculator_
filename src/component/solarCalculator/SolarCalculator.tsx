'use client';

import React, { useState } from 'react';

interface Device {
  id: number;
  name: string;
  watts: number;
  quantity: number;
}

interface AvailableDevice {
  name: string;
  watts: number;
}

const SolarCalculator = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'LED Bulb', watts: 5, quantity: 4 },
    { id: 2, name: 'Laptop', watts: 100, quantity: 1 },
    { id: 3, name: 'Ceiling Fan', watts: 75, quantity: 2 },
    { id: 4, name: 'Table Fan', watts: 50, quantity: 2 },
    { id: 5, name: 'Room Cooler', watts: 250, quantity: 1 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Set<number>>(new Set());

  const availableDevices: AvailableDevice[] = [
    { name: 'LED Bulb 5W', watts: 5 },
    { name: 'LED Bulb 30W', watts: 30 },
    { name: 'CFL Light 15W', watts: 15 },
    { name: 'CFL Heavy 30W', watts: 30 },
    { name: 'Tubelight 20W', watts: 20 },
    { name: 'Tubelight 40W', watts: 40 },
    { name: 'Light Bulb (Incandescent) 40W', watts: 40 },
    { name: 'Light Bulb (Incandescent) 100W', watts: 100 },
    { name: 'Light Bulb 9W', watts: 9 },
    { name: 'Laptop 100W', watts: 100 },
    { name: 'Exhaust Fan', watts: 30 },
    { name: 'Ceiling Fan 75W', watts: 75 },
    { name: 'Room Cooler 250W', watts: 250 },
    { name: 'Table Fan 50W', watts: 50 },
    { name: 'Photo Copier 2000W', watts: 2000 },
    { name: 'Office Printer/Scanner 2000W', watts: 2000 },
    { name: 'Projector 600W', watts: 600 },
    { name: 'Surveillance System 100W', watts: 100 },
    { name: 'Juicer Mixer Grinder', watts: 500 },
    { name: 'Refrigerator (upto 200L) 300W', watts: 300 },
    { name: 'Microwave Oven 1400W', watts: 1400 },
    { name: 'Washing Machine 1000W', watts: 1000 },
    { name: 'Room Heater 2200W', watts: 2200 },
    { name: 'Toaster 800W', watts: 800 },
    { name: 'Refrigerator (upto 500L) 500W', watts: 500 },
    { name: 'Vacuum Cleaner 1400W', watts: 1400 },
    { name: 'Geyser/Water Heater 2200W', watts: 2200 },
    { name: 'Television LED (upto 40") 60W', watts: 60 },
    { name: 'Television Plasma 250W', watts: 250 },
    { name: 'Music System 300W', watts: 300 },
    { name: 'Television CRT (upto 21") 100W', watts: 100 },
    { name: 'Set Top Box (DTH) 50W', watts: 50 },
    { name: 'Gaming Console 200W', watts: 200 },
    { name: 'Air Conditioner (1 Ton, 3 star) 1200W', watts: 1200 },
    { name: 'Air Conditioner (1.5 Ton, 3 star) 1700W', watts: 1700 },
    { name: 'Air Conditioner (2 Ton, 3 star) 2300W', watts: 2300 },
    { name: 'Air Conditioner (1 Ton, Inverter) 1100W', watts: 1100 },
    { name: 'Air Conditioner (1.5 Ton, Inverter) 1600W', watts: 1600 },
    { name: 'Air Conditioner (2 Ton, Inverter) 2100W', watts: 2100 },
    { name: 'Water Pump (0.5 HP) 400W', watts: 400 },
    { name: 'Water Pump (1 HP) 800W', watts: 800 },
  ];

  const calculateTotal = () => {
    return devices.reduce((sum, device) => sum + (device.watts * device.quantity), 0);
  };

  const updateQuantity = (id: number, change: number) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        return { ...device, quantity: Math.max(0, device.quantity + change) };
      }
      return device;
    }));
  };

  const toggleDeviceSelection = (index: number) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedDevices(newSelected);
  };

  const addSelectedDevices = () => {
    const newDevices: Device[] = [];
    selectedDevices.forEach(index => {
      const deviceInfo = availableDevices[index];
      newDevices.push({
        id: Date.now() + index,
        name: deviceInfo.name,
        watts: deviceInfo.watts,
        quantity: 1
      });
    });
    setDevices(prev => [...prev, ...newDevices]);
    setShowModal(false);
    setSelectedDevices(new Set());
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDevices(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-normal text-gray-700">Add your preferred devices</h1>
          <div className="text-right">
            <div className="text-gray-600 text-sm">Total Watts:</div>
            <div className="text-4xl font-semibold text-gray-900">{calculateTotal()} Watts</div>
          </div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-6 py-4 text-left text-gray-600 font-medium">Device</th>
              <th className="border border-gray-300 px-6 py-4 text-center text-gray-600 font-medium">Usage per device</th>
              <th className="border border-gray-300 px-6 py-4 text-center text-gray-600 font-medium">Quantity</th>
              <th className="border border-gray-300 px-6 py-4 text-center text-gray-600 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-6 py-4 text-gray-700">{device.name}</td>
                <td className="border border-gray-300 px-6 py-4 text-center text-gray-700">{device.watts}W</td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => updateQuantity(device.id, -1)}
                      className="text-gray-600 hover:text-gray-800 bg-gray-200 rounded-sm cursor-pointer w-8 h-8 flex items-center justify-center text-xl"
                    >
                      -
                    </button>
                    <span className="text-gray-700 w-8 text-center">{device.quantity}</span>
                    <button
                      onClick={() => updateQuantity(device.id, 1)}
                      className="text-gray-600 hover:text-gray-800 w-8 h-8 bg-gray-200 rounded-sm cursor-pointer flex items-center justify-center text-xl"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="border border-gray-300 px-6 py-4 text-center font-medium text-gray-700">
                  {device.watts * device.quantity}W
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors font-medium"
        >
          Add Device
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Add Device</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              <ul className="space-y-1">
                {availableDevices.map((device, index) => (
                  <li key={index} className="flex items-center py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      id={`device-${index}`}
                      checked={selectedDevices.has(index)}
                      onChange={() => toggleDeviceSelection(index)}
                      className="w-5 h-5 mr-4 cursor-pointer accent-blue-700"
                    />
                    <label
                      htmlFor={`device-${index}`}
                      className="flex-1 cursor-pointer text-gray-700 text-base"
                    >
                      {device.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addSelectedDevices}
                disabled={selectedDevices.size === 0}
                className="px-6 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolarCalculator;