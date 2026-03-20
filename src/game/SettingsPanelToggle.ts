export class SettingsPanelToggle {
  private open = false;

  constructor(
    private readonly button: { setExpanded(expanded: boolean): void },
    private readonly panel: HTMLElement
  ) {
    this.sync();
  }

  toggle(force?: boolean) {
    this.open = force ?? !this.open;
    this.sync();
    return this.open;
  }

  isOpen() {
    return this.open;
  }

  private sync() {
    this.button.setExpanded(this.open);
    this.panel.classList.toggle('is-settings-open', this.open);
  }
}
