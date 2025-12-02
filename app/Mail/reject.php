<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class reject extends Mailable
{
    use Queueable, SerializesModels;
    public $namaLengkap;
    public $logoUrl;
    /**
     * Create a new message instance.
     */
    public function __construct($namaLengkap)
    {   
        $this->namaLengkap = $namaLengkap;
        $this->logoUrl = 'https://i.ibb.co.com/rR6qw0Hj/Group-3-1.png';
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Status Lamaran',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reject',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
