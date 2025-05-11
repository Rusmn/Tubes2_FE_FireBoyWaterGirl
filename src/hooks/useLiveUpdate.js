import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook untuk fitur live update visualisasi recipe
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
  const [partialCombos, setPartialCombos] = useState([]);

  // Simulasi live update dengan timer
  useEffect(() => {
    if (!isEnabled || !searchParams || !algorithm) return;

    // Reset state untuk pencarian baru
    setUpdateHistory([]);
    setCurrentStep(0);
    setIsRunning(true);
    setPartialCombos([]);

    // Elemen yang akan digunakan dalam simulasi
    const basicElements = ["Air", "Earth", "Fire", "Water"];
    const simulatedCombos = [];

    // Fungsi untuk menambahkan combo
    const addCombo = (id, parentId, inputs, output) => {
      const combo = {
        id: id,
        parentId: parentId,
        inputs: inputs,
        output: output,
      };
      simulatedCombos.push(combo);
      return combo;
    };

    // Simulasi langkah-langkah sesuai algoritma
    const simulateSteps = () => {
      const steps = [];
      const targetElement = searchParams.targetElement;

      if (algorithm === "bfs") {
        // BFS biasanya menjelajahi semua node di level yang sama terlebih dahulu
        steps.push({
          message: "Memulai pencarian BFS untuk " + targetElement,
          type: "info",
          combos: [...simulatedCombos],
        });

        // Level 1: Kombinasi elemen dasar
        steps.push({
          message: "Mengunjungi elemen dasar: " + basicElements.join(", "),
          type: "visit",
          combos: [...simulatedCombos],
        });

        // Water + Fire = Steam
        addCombo(0, -1, ["Water", "Fire"], "Steam");
        steps.push({
          message: "Menemukan: Steam (Water + Fire)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Air + Earth = Dust
        addCombo(1, -1, ["Air", "Earth"], "Dust");
        steps.push({
          message: "Menemukan: Dust (Air + Earth)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Earth + Fire = Lava
        addCombo(2, -1, ["Earth", "Fire"], "Lava");
        steps.push({
          message: "Menemukan: Lava (Earth + Fire)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Water + Earth = Mud
        addCombo(3, -1, ["Water", "Earth"], "Mud");
        steps.push({
          message: "Menemukan: Mud (Water + Earth)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Level 2
        steps.push({
          message: "Mengunjungi elemen level 2...",
          type: "visit",
          combos: [...simulatedCombos],
        });

        // Lava + Air = Stone
        addCombo(4, 2, ["Lava", "Air"], "Stone");
        steps.push({
          message: "Menemukan: Stone (Lava + Air)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Mud + Fire = Brick
        addCombo(5, 3, ["Mud", "Fire"], "Brick");
        steps.push({
          message: "Menemukan: Brick (Mud + Fire)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Air + Pressure = Wind
        addCombo(6, -1, ["Air", "Pressure"], "Wind");
        steps.push({
          message: "Menemukan: Wind (Air + Pressure)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Level 3
        steps.push({
          message: "Mengunjungi elemen level 3...",
          type: "visit",
          combos: [...simulatedCombos],
        });

        // Water + Wind = Wave
        addCombo(7, 6, ["Water", "Wind"], "Wave");
        steps.push({
          message: "Menemukan: Wave (Water + Wind)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Stone + Water = Clay
        addCombo(8, 4, ["Stone", "Water"], "Clay");
        steps.push({
          message: "Menemukan: Clay (Stone + Water)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Clay + Fire = Pottery
        if (targetElement === "Pottery" || targetElement === "Clay") {
          addCombo(9, 8, ["Clay", "Fire"], "Pottery");
          steps.push({
            message: "Menemukan: Pottery (Clay + Fire)",
            type: "discover",
            combos: [...simulatedCombos],
          });
        }

        // Final message
        if (simulatedCombos.some((c) => c.output === targetElement)) {
          steps.push({
            message: targetElement + " ditemukan!",
            type: "success",
            combos: [...simulatedCombos],
          });
        } else {
          steps.push({
            message: "Pencarian dilanjutkan...",
            type: "info",
            combos: [...simulatedCombos],
          });
        }
      } else if (algorithm === "dfs") {
        // DFS menjelajahi satu jalur sampai selesai sebelum backtracking
        steps.push({
          message: "Memulai pencarian DFS untuk " + targetElement,
          type: "info",
          combos: [...simulatedCombos],
        });

        // Jalur 1
        steps.push({
          message: "Mengunjungi: Water",
          type: "visit",
          combos: [...simulatedCombos],
        });

        // Water + Earth = Mud
        addCombo(0, -1, ["Water", "Earth"], "Mud");
        steps.push({
          message: "Menemukan: Mud (Water + Earth)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Mud + Fire = Brick
        addCombo(1, 0, ["Mud", "Fire"], "Brick");
        steps.push({
          message: "Menemukan: Brick (Mud + Fire)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        // Backtrack jika target bukan Brick
        if (targetElement !== "Brick" && targetElement !== "Mud") {
          steps.push({
            message: "Backtracking dan mencoba jalur lain...",
            type: "process",
            combos: [...simulatedCombos],
          });

          // Earth + Fire = Lava
          addCombo(2, -1, ["Earth", "Fire"], "Lava");
          steps.push({
            message: "Menemukan: Lava (Earth + Fire)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          // Lava + Air = Stone
          addCombo(3, 2, ["Lava", "Air"], "Stone");
          steps.push({
            message: "Menemukan: Stone (Lava + Air)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          // Stone + Water = Clay
          addCombo(4, 3, ["Stone", "Water"], "Clay");
          steps.push({
            message: "Menemukan: Clay (Stone + Water)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          // Clay + Fire = Pottery
          if (targetElement === "Pottery" || targetElement === "Clay") {
            addCombo(5, 4, ["Clay", "Fire"], "Pottery");
            steps.push({
              message: "Menemukan: Pottery (Clay + Fire)",
              type: "discover",
              combos: [...simulatedCombos],
            });
          }
        }

        // Final message
        if (simulatedCombos.some((c) => c.output === targetElement)) {
          steps.push({
            message: targetElement + " ditemukan!",
            type: "success",
            combos: [...simulatedCombos],
          });
        } else {
          steps.push({
            message: "DFS melanjutkan pencarian di jalur lain...",
            type: "info",
            combos: [...simulatedCombos],
          });
        }
      } else {
        // Bidirectional search
        steps.push({
          message: "Memulai pencarian Bidirectional untuk " + targetElement,
          type: "info",
          combos: [...simulatedCombos],
        });

        steps.push({
          message: "Pencarian maju dari elemen dasar...",
          type: "process",
          combos: [...simulatedCombos],
        });

        // Forward search
        addCombo(0, -1, ["Water", "Earth"], "Mud");
        steps.push({
          message: "Forward: Menemukan Mud (Water + Earth)",
          type: "discover",
          combos: [...simulatedCombos],
        });

        steps.push({
          message: "Pencarian mundur dari target: " + targetElement + "...",
          type: "process",
          combos: [...simulatedCombos],
        });

        // Backward search (kita simulasikan dengan menambahkan node terdekat ke target)
        if (targetElement === "Brick") {
          addCombo(1, -1, ["Mud", "Fire"], "Brick");
          steps.push({
            message: "Backward: Menemukan Brick membutuhkan (Mud + Fire)",
            type: "discover",
            combos: [...simulatedCombos],
          });
        } else if (targetElement === "Pottery") {
          addCombo(1, -1, ["Clay", "Fire"], "Pottery");
          steps.push({
            message: "Backward: Menemukan Pottery membutuhkan (Clay + Fire)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          addCombo(2, -1, ["Stone", "Water"], "Clay");
          steps.push({
            message: "Backward: Menemukan Clay membutuhkan (Stone + Water)",
            type: "discover",
            combos: [...simulatedCombos],
          });
        } else {
          // Simulasi untuk elemen lain
          addCombo(1, -1, ["Earth", "Fire"], "Lava");
          steps.push({
            message: "Forward: Menemukan Lava (Earth + Fire)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          addCombo(2, 1, ["Lava", "Air"], "Stone");
          steps.push({
            message: "Forward: Menemukan Stone (Lava + Air)",
            type: "discover",
            combos: [...simulatedCombos],
          });
        }

        // Meet in the middle
        steps.push({
          message: "Pencarian maju dan mundur bertemu di tengah!",
          type: "success",
          combos: [...simulatedCombos],
        });

        // Tambahkan jalur lengkap
        if (targetElement === "Brick") {
          steps.push({
            message: "Recipe lengkap: Water + Earth = Mud, Mud + Fire = Brick",
            type: "info",
            combos: [...simulatedCombos],
          });
        } else if (targetElement === "Pottery") {
          addCombo(3, 2, ["Lava", "Air"], "Stone");
          steps.push({
            message: "Forward: Menemukan Stone (Lava + Air)",
            type: "discover",
            combos: [...simulatedCombos],
          });

          steps.push({
            message:
              "Recipe lengkap ditemukan: Earth+Fire=Lava, Lava+Air=Stone, Stone+Water=Clay, Clay+Fire=Pottery",
            type: "info",
            combos: [...simulatedCombos],
          });
        } else {
          steps.push({
            message: "Recipe lengkap ditemukan untuk " + targetElement,
            type: "info",
            combos: [...simulatedCombos],
          });
        }
      }

      return steps;
    };

    const steps = simulateSteps();
    let stepIndex = 0;

    // Timer untuk mengirim update
    const timer = setInterval(() => {
      if (stepIndex < steps.length) {
        setUpdateHistory((prev) => [...prev, steps[stepIndex]]);
        setCurrentStep(stepIndex + 1);
        setPartialCombos(steps[stepIndex].combos);
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
    partialCombos,
    setUpdateSpeed,
    stopLiveUpdate,
  };
}

export default useLiveUpdate;
