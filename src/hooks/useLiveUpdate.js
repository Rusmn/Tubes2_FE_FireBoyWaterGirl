import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk fitur live update visualisasi recipe (versi sederhana dengan simulasi)
 * @param {boolean} isEnabled - Apakah fitur live update diaktifkan
 * @param {string} algorithm - Algoritma yang digunakan (bfs, dfs, bidirectional)
 * @param {Object} searchParams - Parameter pencarian
 * @returns {Object} - Data yang dibutuhkan untuk live update
 */
function useLiveUpdate(isEnabled, algorithm, searchParams) {
  const [updateHistory, setUpdateHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [updateSpeed, setUpdateSpeedState] = useState(500); // ms

  // Simulasi live update dengan timer
  useEffect(() => {
    if (!isEnabled || !searchParams || !algorithm) return;

    // Reset state untuk pencarian baru
    setUpdateHistory([]);
    setCurrentStep(0);
    setIsRunning(true);

    // Contoh data untuk simulasi update
    const simulateSteps = () => {
      const steps = [];
      const targetElement = searchParams.targetElement;
      
      // Elemen yang akan digunakan dalam simulasi
      const basicElements = ['Air', 'Earth', 'Fire', 'Water'];
      const intermediateElements = ['Steam', 'Lava', 'Dust', 'Pressure', 'Stone'];

      // Simulasi langkah-langkah sesuai algoritma
      if (algorithm === 'bfs') {
        // BFS biasanya menjelajahi semua node di level yang sama terlebih dahulu
        steps.push({ message: 'Memulai pencarian BFS untuk ' + targetElement, type: 'info' });
        steps.push({ message: 'Mengunjungi: ' + basicElements.join(', '), type: 'visit' });
        steps.push({ message: 'Membuat kombinasi tingkat 1...', type: 'process' });
        steps.push({ message: 'Menemukan: Steam (Water + Fire)', type: 'discover' });
        steps.push({ message: 'Menemukan: Dust (Air + Earth)', type: 'discover' });
        steps.push({ message: 'Menemukan: Lava (Earth + Fire)', type: 'discover' });
        steps.push({ message: 'Mengunjungi node level 2...', type: 'visit' });
        steps.push({ message: 'Menemukan: Stone (Lava + Air)', type: 'discover' });
        steps.push({ message: 'Menemukan: ' + targetElement + ' ditemukan!', type: 'success' });
      } else if (algorithm === 'dfs') {
        // DFS menjelajahi setiap jalur hingga kedalaman maksimum terlebih dahulu
        steps.push({ message: 'Memulai pencarian DFS untuk ' + targetElement, type: 'info' });
        steps.push({ message: 'Mengunjungi: Air', type: 'visit' });
        steps.push({ message: 'Mengunjungi: Air + Fire', type: 'visit' });
        steps.push({ message: 'Tidak ditemukan, backtrack', type: 'process' });
        steps.push({ message: 'Mengunjungi: Air + Water', type: 'visit' });
        steps.push({ message: 'Tidak ditemukan, backtrack', type: 'process' });
        steps.push({ message: 'Mengunjungi: Air + Earth', type: 'visit' });
        steps.push({ message: 'Menemukan: Dust', type: 'discover' });
        steps.push({ message: 'Mengunjungi: Dust + Fire', type: 'visit' });
        steps.push({ message: 'Menemukan: ' + targetElement + ' ditemukan!', type: 'success' });
      } else {
        // Bidirectional search
        steps.push({ message: 'Memulai pencarian Bidirectional untuk ' + targetElement, type: 'info' });
        steps.push({ message: 'Pencarian maju dari elemen dasar...', type: 'process' });
        steps.push({ message: 'Pencarian mundur dari ' + targetElement + '...', type: 'process' });
        steps.push({ message: 'Menemukan: Steam dari depan', type: 'discover' });
        steps.push({ message: 'Menemukan: Stone dari belakang', type: 'discover' });
        steps.push({ message: 'Pencarian bertemu di tengah!', type: 'success' });
        steps.push({ message: 'Recipe lengkap ditemukan untuk ' + targetElement, type: 'info' });
      }

      return steps;
    };

    const steps = simulateSteps();
    let stepIndex = 0;

    // Timer untuk mengirim update
    const timer = setInterval(() => {
      if (stepIndex < steps.length) {
        setUpdateHistory(prev => [...prev, steps[stepIndex]]);
        setCurrentStep(stepIndex + 1);
        stepIndex++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, updateSpeed);

    return () => {
      clearInterval(timer);
      setIsRunning(false);
    };
  }, [isEnabled, algorithm, searchParams, updateSpeed]);

  // Fungsi untuk mengatur kecepatan update
  const setUpdateSpeed = useCallback((speed) => {
    setUpdateSpeedState(speed);
  }, []);

  // Fungsi untuk menghentikan live update
  const stopLiveUpdate = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    updateHistory,
    currentStep,
    isRunning,
    setUpdateSpeed,
    stopLiveUpdate
  };
}

export default useLiveUpdate;