import { useLayoutEffect, useRef, type CSSProperties, type MouseEvent, type SyntheticEvent } from 'react'
import { PlaylistDetail } from '@monorepo/ui-components'
import type { Playlist } from './filter-playlists'
import { coverDataUrl, listenUrl } from './cover'
import * as S from './PlaylistDialog.style'

interface PlaylistDialogProps {
  playlist: Playlist | null
  onClose: () => void
}

// Native <dialog>: showModal gives focus trap, Escape and the top layer for free.
function PlaylistDialog ({ playlist, onClose }: PlaylistDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Layout effect: it runs inside the view transition's flushSync, so the opened dialog is in the new snapshot
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (playlist && !dialog.open) dialog.showModal()
    if (!playlist && dialog.open) dialog.close()
  }, [playlist])

  function handleCancel (event: SyntheticEvent<HTMLDialogElement>) {
    // Escape: take over so closing goes through the URL and the transition
    event.preventDefault()
    onClose()
  }

  function handleBackdropClick (event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <S.Dialog ref={dialogRef} aria-label={playlist?.name} onCancel={handleCancel} onClick={handleBackdropClick}>
      {playlist && (
        <PlaylistDetail
          imgUrl={coverDataUrl(playlist)}
          name={playlist.name}
          owner={playlist.owner}
          minutes={playlist.minutes}
          trackCount={playlist.tracks}
          pairsWith={playlist.pairsWith}
          mood={playlist.mood}
          tags={[playlist.genre, playlist.occasion]}
          tracklist={playlist.tracklist}
          listenUrl={listenUrl(playlist.name)}
          onClose={onClose}
          coverStyle={{ viewTransitionName: `cover-${playlist.id}` } as CSSProperties}
        />
      )}
    </S.Dialog>
  )
}

export default PlaylistDialog
