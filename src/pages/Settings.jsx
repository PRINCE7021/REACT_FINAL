import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { settings, updateSettings, notify } = useApp();

  const handleSave = (e) => {
    e.preventDefault();
    notify('Settings saved', 'success');
  };

  return (
    <Layout title="Study Settings Hub">
      <form className="panel panel--narrow" onSubmit={handleSave}>
        <div className="panel__header">
          <h2>Lab preferences</h2>
        </div>
        <p className="muted">These settings broadcast to every tool in the workspace and persist between sessions.</p>

        <div className="settings-row">
          <div>
            <strong>Theme</strong>
            <p className="muted">Choose a light or dark workspace.</p>
          </div>
          <div className="segmented">
            <button
              type="button"
              className={`segmented__btn ${settings.theme === 'light' ? 'segmented__btn--active' : ''}`}
              onClick={() => updateSettings({ theme: 'light' })}
            >
              Light
            </button>
            <button
              type="button"
              className={`segmented__btn ${settings.theme === 'dark' ? 'segmented__btn--active' : ''}`}
              onClick={() => updateSettings({ theme: 'dark' })}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Notifications</strong>
            <p className="muted">Get alerted when new mutation flags are detected.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSettings({ notifications: e.target.checked })}
            />
            <span className="switch__track"><span className="switch__thumb" /></span>
          </label>
        </div>

        <div className="settings-row">
          <div>
            <strong>DNA sequence display length</strong>
            <p className="muted">Bases shown per row in the DNA Viewer.</p>
          </div>
          <select
            className="select"
            value={settings.sequenceLength}
            onChange={(e) => updateSettings({ sequenceLength: Number(e.target.value) })}
          >
            <option value={30}>30 bases / row</option>
            <option value={45}>45 bases / row</option>
            <option value={60}>60 bases / row</option>
            <option value={90}>90 bases / row</option>
          </select>
        </div>

        <button className="btn btn--primary" type="submit">Save settings</button>
      </form>
    </Layout>
  );
}
