"use client";

import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");

    async function handleButtonClick() {
        const url =
            "https://vy57sbrm51.execute-api.ap-south-1.amazonaws.com/email-service/send";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: email }),
        };

        await fetch(url, options);

        alert("Thanks for joining");
    }

    return (
        <div>
            <div className="container">
                <h1>Joining List</h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 400,
                    }}
                >
                    <label htmlFor="mail">Enter your email</label>
                    <input
                        required
                        type="email"
                        id="mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        style={{ color: "black" }}
                    />
                    <button onClick={handleButtonClick}>Join</button>
                </div>
            </div>
        </div>
    );
}
