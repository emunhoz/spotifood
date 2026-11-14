import '@testing-library/jest-dom/vitest'

// jsdom has no <dialog> behaviour; every supported browser does (2022+). Mirror the open state only.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) { this.setAttribute('open', '') }
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) { this.removeAttribute('open') }
