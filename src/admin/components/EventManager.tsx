import { FormEvent, useEffect, useState } from 'react';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { deleteEvent, saveEvent, updateEventRegistrationState } from '../../lib/firestore';
import { ClubEvent, EventRegistration } from '../../types';

interface EventManagerProps {
  events: ClubEvent[];
  registrations: EventRegistration[];
}

const emptyEvent: Omit<ClubEvent, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  date: '',
  venue: '',
  category: '',
  image: '',
  registrationOpen: true,
};

export const EventManager = ({ events, registrations }: EventManagerProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ClubEvent | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [saving, setSaving] = useState(false);
  const [viewingEventId, setViewingEventId] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    if (!editingEvent) {
      setForm(emptyEvent);
      return;
    }

    setForm({
      title: editingEvent.title,
      description: editingEvent.description,
      date: editingEvent.date,
      venue: editingEvent.venue,
      category: editingEvent.category,
      image: editingEvent.image,
      registrationOpen: editingEvent.registrationOpen,
    });
  }, [editingEvent]);

  const openCreate = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEdit = (event: ClubEvent) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      await saveEvent(form, editingEvent?.id);
      setToast({ message: editingEvent ? 'Event updated.' : 'Event created.', type: 'success' });
      setModalOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save event.';

      console.error('[EventManager] Save failed:', error);
      setToast({ message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setToast({ message: 'Event deleted.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete event.';

      console.error('[EventManager] Delete failed:', error);
      setToast({ message, type: 'error' });
    }
  };

  const toggleRegistration = async (eventItem: ClubEvent) => {
    try {
      await updateEventRegistrationState(eventItem.id, !eventItem.registrationOpen);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update registration state.';

      console.error('[EventManager] Toggle failed:', error);
      setToast({ message, type: 'error' });
    }
  };

  const viewingRegistrations = registrations.filter((registration) => registration.eventId === viewingEventId);

  return (
    <div className="space-y-4">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d4af37] px-4 font-bold text-black"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((eventItem) => (
          <article key={eventItem.id} className="overflow-hidden rounded-lg border border-[#d4af37]/20 bg-black/60">
            <img src={eventItem.image} alt={eventItem.title} className="h-44 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">{eventItem.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#fff1a8]">{eventItem.title}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs ${eventItem.registrationOpen ? 'border-emerald-400/30 text-emerald-300' : 'border-red-400/30 text-red-300'}`}>
                  {eventItem.registrationOpen ? 'Open' : 'Closed'}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#c9b66f]">{eventItem.description}</p>
              <p className="mt-3 text-sm text-[#d9c77c]">{eventItem.date} · {eventItem.venue}</p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button type="button" onClick={() => openEdit(eventItem)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d4af37]/20 px-3 py-2 text-sm text-[#fff1a8]"><Edit3 size={15} />Edit</button>
                <button type="button" onClick={() => toggleRegistration(eventItem)} className="rounded-lg border border-[#d4af37]/20 px-3 py-2 text-sm text-[#fff1a8]">{eventItem.registrationOpen ? 'Close' : 'Open'}</button>
                <button type="button" onClick={() => setViewingEventId(eventItem.id)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d4af37]/20 px-3 py-2 text-sm text-[#fff1a8]"><Eye size={15} />Regs</button>
                <button type="button" onClick={() => remove(eventItem.id)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/25 px-3 py-2 text-sm text-red-300"><Trash2 size={15} />Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal title={editingEvent ? 'Edit Event' : 'Add Event'} open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={submit} className="space-y-4">
          <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" className="h-11 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 outline-none" />
          <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" className="min-h-28 w-full rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 py-3 outline-none" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 outline-none" />
            <input required value={form.venue} onChange={(event) => setForm({ ...form, venue: event.target.value })} placeholder="Venue" className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 outline-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Category" className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 outline-none" />
            <input required value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="Image URL" className="h-11 rounded-lg border border-[#d4af37]/20 bg-black/70 px-3 outline-none" />
          </div>
          <label className="flex items-center gap-3 text-sm text-[#d9c77c]">
            <input type="checkbox" checked={form.registrationOpen} onChange={(event) => setForm({ ...form, registrationOpen: event.target.checked })} className="h-4 w-4 accent-[#d4af37]" />
            Registration open
          </label>
          <button type="submit" disabled={saving} className="h-11 w-full rounded-lg bg-[#d4af37] font-bold text-black disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Event'}
          </button>
        </form>
      </Modal>

      <Modal title="Event Registrations" open={Boolean(viewingEventId)} onClose={() => setViewingEventId('')}>
        <div className="space-y-3">
          {viewingRegistrations.length === 0 ? (
            <p className="text-sm text-[#c9b66f]">No registrations for this event yet.</p>
          ) : (
            viewingRegistrations.map((registration) => (
              <div key={registration.id} className="rounded-lg border border-[#d4af37]/15 bg-black/60 p-3 text-sm text-[#d9c77c]">
                <p className="font-semibold text-[#fff1a8]">{registration.name}</p>
                <p>{registration.email}</p>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};
