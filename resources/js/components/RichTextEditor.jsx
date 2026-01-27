import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }) {
    const editorRef = useRef(null);

    return (
        <div className="rounded-lg overflow-hidden border border-slate-700">
            <Editor
                tinymceScriptSrc="/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                onEditorChange={(content) => onChange(content)}
                init={{
                    license_key: 'gpl',
                    height: 600,
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'directionality', 'searchreplace', 'visualchars', 'quickbars', 'autosave'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic underline strikethrough | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'link image media | removeformat | restoredraft | help',
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    content_style: `
                        body { 
                            font-family: 'Instrument Sans', sans-serif; 
                            font-size: 16px; 
                            background-color: #0f172a; 
                            color: #e2e8f0; 
                            line-height: 1.6;
                        }
                        a { color: #c084fc; text-decoration: underline; }
                        h1, h2, h3, h4, h5, h6 { color: #f8fafc; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
                        code { background-color: #1e293b; color: #e2e8f0; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; }
                        pre { background-color: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
                        img { max-width: 100%; height: auto; border-radius: 0.5rem; }
                        blockquote { border-left: 4px solid #7c3aed; margin-left: 0; padding-left: 1rem; font-style: italic; color: #94a3b8; }
                    `,
                    placeholder: placeholder,
                    block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Code Block=pre',
                    branding: false,
                    promotion: false,

                    // Image Upload Configuration
                    images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append('image', blobInfo.blob(), blobInfo.filename());

                        const xhr = new XMLHttpRequest();
                        xhr.open('POST', '/admin/posts/upload-image');

                        // Add CSRF Token
                        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                        if (token) {
                            xhr.setRequestHeader('X-CSRF-TOKEN', token);
                        }

                        xhr.upload.onprogress = (e) => {
                            progress(e.loaded / e.total * 100);
                        };

                        xhr.onload = () => {
                            if (xhr.status === 403) {
                                reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                                return;
                            }

                            if (xhr.status < 200 || xhr.status >= 300) {
                                reject('HTTP Error: ' + xhr.status);
                                return;
                            }

                            try {
                                const json = JSON.parse(xhr.responseText);
                                if (!json || typeof json.url !== 'string') {
                                    reject('Invalid JSON: ' + xhr.responseText);
                                    return;
                                }
                                resolve(json.url);
                            } catch (e) {
                                reject('Invalid JSON: ' + xhr.responseText);
                            }
                        };

                        xhr.onerror = () => {
                            reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                        };

                        xhr.send(formData);
                    }),
                    automatic_uploads: true,
                    paste_data_images: true,

                    // Quickbas & Context Menu
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    contextmenu: 'link image table',
                }}
            />
        </div>
    );
}
