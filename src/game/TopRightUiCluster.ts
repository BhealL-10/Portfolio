import { SettingsButton } from './SettingsButton';
import { SettingsPanelToggle } from './SettingsPanelToggle';

export class TopRightUiCluster {
  readonly element: HTMLDivElement;
  readonly settingsButton: SettingsButton;
  readonly settingsToggle: SettingsPanelToggle;

  constructor(host: HTMLElement, panel: HTMLElement, label: string) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__top-right-cluster';

    this.settingsButton = new SettingsButton(label);
    this.settingsToggle = new SettingsPanelToggle(this.settingsButton, panel);

    this.element.appendChild(this.settingsButton.element);
    host.appendChild(this.element);
  }

  toggle(force?: boolean) {
    return this.settingsToggle.toggle(force);
  }

  isOpen() {
    return this.settingsToggle.isOpen();
  }

  dispose() {
    this.settingsButton.dispose();
  }
}
