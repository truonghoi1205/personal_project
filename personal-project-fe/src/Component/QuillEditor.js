import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function QuillEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (!quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: placeholder,
            });

            quillInstance.current.on('text-change', () => {
                const content = quillInstance.current.root.innerHTML;
                onChange(content);
            });
        }
    }, [placeholder, onChange]);

    useEffect(() => {
        if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
            quillInstance.current.clipboard.dangerouslyPasteHTML(value);
        }
    }, [value]);

    return <div ref={editorRef} style={{ height: '95px' }} />;
}

export default QuillEditor;
