import { NextResponse } from 'next/server';

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getStringValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const name = getStringValue(body.name);
    const email = getStringValue(body.email);
    const company = getStringValue(body.company);
    const message = getStringValue(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, email, and message are required.',
        },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid email address.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon.',
      submission: {
        name,
        email,
        company,
        message,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong while processing your request.',
      },
      { status: 500 }
    );
  }
}