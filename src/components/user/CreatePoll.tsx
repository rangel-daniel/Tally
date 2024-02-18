import { useMutation } from '@tanstack/react-query';
import { createPoll } from '../../api/authRequests';
import { useAuth } from '../../hooks/useAuth';
import { PollSettings } from '../../types/Polls';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePoll.css';

const CreatePoll = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [question, setQuestion] = useState<string>('');
    const [opts, setOptions] = useState<{ opt: string }[]>([{ opt: '' }, { opt: '' }]);
    const [expandDeadline, setExpandDeadline] = useState(false);
    const [settings, setSettings] = useState<PollSettings>({
        allowMultiple: false,
        reqNames: false,
        allowEdit: false,
        reqSignin: false,
        deadline: '',
    });

    const handleSubmt = (e: FormEvent) => {
        e.preventDefault();
        mutate();
    };

    const rmOption = (indx: number) => {
        const _options = [...opts];
        _options.splice(indx, 1);
        setOptions(_options);
    };

    const updateOptions = (indx: number, field: string) => {
        const _options = [...opts];
        _options[indx] = { opt: field };
        setOptions(_options);
    };

    const updateSettings = (field: string, value: boolean | string) => {
        const _settings = { ...settings, [field]: value };
        setSettings(_settings);
    };

    const toggleDeadline = (isChecked: boolean) => {
        if (isChecked) updateSettings('deadline', getNow());
        else updateSettings('deadline', '');
        setExpandDeadline(isChecked);
    };

    const { mutate } = useMutation({
        mutationFn: () =>
            createPoll(accessToken || '', {
                question,
                opts,
                settings: {
                    ...settings,
                    deadline:
                        settings.deadline && settings.deadline != ''
                            ? new Date(settings.deadline).toUTCString()
                            : undefined,
                },
            }),
        mutationKey: ['createPoll'],
        onSettled: (error) => {
            if (!error) {
                navigate('/', { replace: true });
            } else {
                console.error(error);
            }
        },
    });

    const getNow = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const pollMain = (
        <section id="pole-form-main">
            <h2>Create poll</h2>
            <input
                value={question}
                placeholder="Question..."
                onChange={(e) => setQuestion(e.target.value)}
                onBlur={() => setQuestion(question.trim())}
                minLength={1}
                maxLength={255}
                required
            />
            <br />
            <br />

            <button type="button" onClick={() => setOptions([...opts, { opt: '' }])}>
                + Add option
            </button>
            {opts.map((field, indx) => (
                <div key={indx}>
                    <input
                        type="text"
                        value={field.opt}
                        placeholder="Option..."
                        onChange={(e) => updateOptions(indx, e.target.value)}
                        onBlur={() => updateOptions(indx, opts[indx].opt.trim())}
                        minLength={1}
                        maxLength={255}
                        required
                    />
                    {indx > 1 && <button onClick={() => rmOption(indx)}>x</button>}
                </div>
            ))}
        </section>
    );

    const pollSettings = (
        <section id="poll-form-settings">
            <h3>Settings</h3>
            <div style={{ display: 'flex', alignSelf: 'center' }}>
                <div>
                    <label htmlFor="allowMultiple">
                        Allow selection of multiple opts
                    </label>
                    <br />
                    <label htmlFor="reqName">Require participants' names</label>
                    <br />
                    <label htmlFor="allowEdit">
                        Allow participants to edit their vote
                    </label>
                    <br />
                    <label htmlFor="reqSignin">Require sign in to participate</label>
                    <br />
                    <label htmlFor="expandDeadline">Set a deadline to participate</label>
                    <br />
                    {expandDeadline && (
                        <input
                            type="datetime-local"
                            value={settings.deadline}
                            onChange={(e) => updateSettings('deadline', e.target.value)}
                            min={getNow()}
                            required
                        />
                    )}
                </div>
                <div>
                    {Object.keys(settings).map(
                        (key, i) =>
                            typeof settings[key as keyof PollSettings] === 'boolean' && (
                                <div key={i}>
                                    <label className="switch">
                                        <input
                                            name={key}
                                            checked={Boolean(
                                                settings[key as keyof PollSettings],
                                            )}
                                            type="checkbox"
                                            onChange={(e) =>
                                                updateSettings(key, e.target.checked)
                                            }
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            ),
                    )}

                    <label className="switch">
                        <input
                            checked={expandDeadline}
                            onChange={(e) => toggleDeadline(e.target.checked)}
                            type="checkbox"
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </section>
    );

    return (
        <div>
            <form onSubmit={handleSubmt}>
                {pollMain}
                {pollSettings}
                <button type="submit">Create poll</button>
            </form>
        </div>
    );
};
export default CreatePoll;
