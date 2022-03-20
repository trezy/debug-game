// Module imports
import { useMemo } from "react";

// Local imports
import { LoadingGameScene } from "./scenes/LoadingGameScene.jsx";
import { LoadingMapScene } from "./scenes/LoadingMapScene.jsx";
import { MapSelectScene } from "./scenes/MapSelectScene.jsx";
import { PlayScene } from "./scenes/PlayScene.jsx";
import { SettingsScene } from "./scenes/SettingsScene.jsx";
import { TitleScene } from "./scenes/TitleScene.jsx";
import { useStore } from "../store/react.js";
import { SelectSaveScene } from "./scenes/SelectSaveScene";

// Constants
const SCENES = {
  loadingGame: {
    component: <LoadingGameScene />,
  },
  loadingMap: {
    component: <LoadingMapScene />,
  },
  mapSelect: {
    component: <MapSelectScene />,
  },
  play: {
    component: <PlayScene />,
  },
  settings: {
    component: <SettingsScene />,
  },
  title: {
    component: <TitleScene />,
  },
  selectSave: {
    component: <SelectSaveScene></SelectSaveScene>,
  },
};

export function SceneManager() {
  const [currentScene] = useStore((state) => [state.currentScene]);

  const scene = useMemo(() => SCENES[currentScene], [currentScene, SCENES]);

  return scene.component;
}
