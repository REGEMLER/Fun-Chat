import './root.css';

export function createRoot() {
    let root: HTMLElement | null = document.getElementById('root');
    if (!root) {
        root = document.createElement('DIV');
    }
    root.id = 'root';
    root.innerHTML = '';
    document.body.append(root);
    return root;
}
