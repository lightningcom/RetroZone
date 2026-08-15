import json

# 1. Load horn tracks for Highway
horn_tracks = json.load(open('horn_tracks.json', encoding='utf-8'))

# Clean up / verify highway tracks
highway_tracks = []
for t in horn_tracks:
    highway_tracks.append({
        "id": t["id"],
        "title": t.get("title") or t.get("rawTitle", "Highway Track"),
        "artist": t.get("artist") or "90s Bollywood",
        "duration": t.get("duration", 300),
        "cover": t.get("cover") or f"https://img.youtube.com/vi/{t['id']}/hqdefault.jpg"
    })

# 2. Dhaba Sufiana tracks (Sufi, Qawwali, Dhaba winter vibes)
dhaba_tracks = [
    {
        "id": "e_z24a_bZ04",
        "title": "Afreen Afreen",
        "artist": "Rahat Fateh Ali Khan & Momina Mustehsan",
        "duration": 405,
        "cover": "https://img.youtube.com/vi/e_z24a_bZ04/hqdefault.jpg"
    },
    {
        "id": "0B1zKzUv56M",
        "title": "Kun Faya Kun",
        "artist": "A.R. Rahman, Javed Ali, Mohit Chauhan",
        "duration": 472,
        "cover": "https://img.youtube.com/vi/0B1zKzUv56M/hqdefault.jpg"
    },
    {
        "id": "0WkOxYmbdt4",
        "title": "Mere Rashke Qamar",
        "artist": "Nusrat Fateh Ali Khan & Rahat Fateh Ali Khan",
        "duration": 220,
        "cover": "https://img.youtube.com/vi/0WkOxYmbdt4/hqdefault.jpg"
    },
    {
        "id": "yIIGQP7V4GY",
        "title": "Chaap Tilak",
        "artist": "Abida Parveen & Rahat Fateh Ali Khan",
        "duration": 540,
        "cover": "https://img.youtube.com/vi/yIIGQP7V4GY/hqdefault.jpg"
    },
    {
        "id": "vS2LvxEE7qQ",
        "title": "Teri Deewani",
        "artist": "Kailash Kher",
        "duration": 320,
        "cover": "https://img.youtube.com/vi/vS2LvxEE7qQ/hqdefault.jpg"
    },
    {
        "id": "kw4tT7SCmaY",
        "title": "Tajdar-e-Haram",
        "artist": "Atif Aslam",
        "duration": 628,
        "cover": "https://img.youtube.com/vi/kw4tT7SCmaY/hqdefault.jpg"
    },
    {
        "id": "d_HlPboLRL8",
        "title": "Nit Khair Manga",
        "artist": "Nusrat Fateh Ali Khan",
        "duration": 375,
        "cover": "https://img.youtube.com/vi/d_HlPboLRL8/hqdefault.jpg"
    },
    {
        "id": "pA_mE1s0H28",
        "title": "Maula Mere Maula",
        "artist": "Roop Kumar Rathod",
        "duration": 350,
        "cover": "https://img.youtube.com/vi/pA_mE1s0H28/hqdefault.jpg"
    },
    {
        "id": "kUaI_D3d3Ww",
        "title": "Sajdaa",
        "artist": "Rahat Fateh Ali Khan & Richa Sharma",
        "duration": 365,
        "cover": "https://img.youtube.com/vi/kUaI_D3d3Ww/hqdefault.jpg"
    },
    {
        "id": "Z1BCujX3pw8",
        "title": "Duma Dum Mast Kalandar",
        "artist": "Runa Laila / Nusrat Fateh Ali Khan",
        "duration": 380,
        "cover": "https://img.youtube.com/vi/Z1BCujX3pw8/hqdefault.jpg"
    }
]

# 3. Dance 2000s Dhamaka (2000s Bollywood party hits)
dance2000_tracks = [
    {
        "id": "3Rfb74x0-8Q",
        "title": "Mauja Hi Mauja",
        "artist": "Mika Singh (Jab We Met)",
        "duration": 245,
        "cover": "https://img.youtube.com/vi/3Rfb74x0-8Q/hqdefault.jpg"
    },
    {
        "id": "Wq54FzV5s4E",
        "title": "Dus Bahane",
        "artist": "Shaan & KK (Dus)",
        "duration": 210,
        "cover": "https://img.youtube.com/vi/Wq54FzV5s4E/hqdefault.jpg"
    },
    {
        "id": "W_K_m10Y_G4",
        "title": "Dhoom Machale",
        "artist": "Sunidhi Chauhan (Dhoom)",
        "duration": 230,
        "cover": "https://img.youtube.com/vi/W_K_m10Y_G4/hqdefault.jpg"
    },
    {
        "id": "xW2O6k_v5bU",
        "title": "It's the Time to Disco",
        "artist": "Shaan, Vasundhara Das, KK (Kal Ho Naa Ho)",
        "duration": 333,
        "cover": "https://img.youtube.com/vi/xW2O6k_v5bU/hqdefault.jpg"
    },
    {
        "id": "7zp1TbLFPp8",
        "title": "Desi Girl",
        "artist": "Shankar Mahadevan, Sunidhi Chauhan (Dostana)",
        "duration": 305,
        "cover": "https://img.youtube.com/vi/7zp1TbLFPp8/hqdefault.jpg"
    },
    {
        "id": "qFkNATtc3mc",
        "title": "Where's The Party Tonight",
        "artist": "Javed Ali, Shaan, Vasundhara Das",
        "duration": 380,
        "cover": "https://img.youtube.com/vi/qFkNATtc3mc/hqdefault.jpg"
    },
    {
        "id": "1yBm6X1fQEQ",
        "title": "Rock N Roll Soniye",
        "artist": "Shankar Mahadevan, Shaan, Mahalakshmi Iyer",
        "duration": 340,
        "cover": "https://img.youtube.com/vi/1yBm6X1fQEQ/hqdefault.jpg"
    },
    {
        "id": "W9m_Kit4IZ0",
        "title": "Subha Hone Na De",
        "artist": "Mika Singh & Shefali Alvares",
        "duration": 290,
        "cover": "https://img.youtube.com/vi/W9m_Kit4IZ0/hqdefault.jpg"
    }
]

# 4. Retro 90s Nostalgia
retro90s_tracks = [
    {
        "id": "4h0K5hZ4m_0",
        "title": "Chura Ke Dil Mera",
        "artist": "Kumar Sanu & Alka Yagnik (Main Khiladi Tu Anari)",
        "duration": 350,
        "cover": "https://img.youtube.com/vi/4h0K5hZ4m_0/hqdefault.jpg"
    },
    {
        "id": "M_p0xN8P9yU",
        "title": "Dheere Dheere Se Meri Zindagi Me Aana",
        "artist": "Kumar Sanu & Anuradha Paudwal (Aashiqui)",
        "duration": 320,
        "cover": "https://img.youtube.com/vi/M_p0xN8P9yU/hqdefault.jpg"
    },
    {
        "id": "1_VbF-V_f0g",
        "title": "Pehla Nasha",
        "artist": "Udit Narayan & Sadhana Sargam (Jo Jeeta Wohi Sikandar)",
        "duration": 290,
        "cover": "https://img.youtube.com/vi/1_VbF-V_f0g/hqdefault.jpg"
    },
    {
        "id": "cNV5hL42g74",
        "title": "Tujhe Dekha Toh Yeh Jaana Sanam",
        "artist": "Kumar Sanu & Lata Mangeshkar (DDLJ)",
        "duration": 302,
        "cover": "https://img.youtube.com/vi/cNV5hL42g74/hqdefault.jpg"
    },
    {
        "id": "Q_40jP7F_1M",
        "title": "Tip Tip Barsa Paani",
        "artist": "Alka Yagnik & Udit Narayan (Mohra)",
        "duration": 355,
        "cover": "https://img.youtube.com/vi/Q_40jP7F_1M/hqdefault.jpg"
    },
    {
        "id": "N0jnLZxYwYc",
        "title": "Mujhse Mohabbat Ka Izhaar Karta",
        "artist": "Kumar Sanu & Alka Yagnik",
        "duration": 304,
        "cover": "https://img.youtube.com/vi/N0jnLZxYwYc/hqdefault.jpg"
    },
    {
        "id": "3NWMK2MRqIk",
        "title": "Tumsa Koi Pyaara",
        "artist": "Kumar Sanu & Alka Yagnik",
        "duration": 376,
        "cover": "https://img.youtube.com/vi/3NWMK2MRqIk/hqdefault.jpg"
    },
    {
        "id": "9b0iydtDZLU",
        "title": "Waada Raha Sanam",
        "artist": "Abhijeet & Alka Yagnik",
        "duration": 365,
        "cover": "https://img.youtube.com/vi/9b0iydtDZLU/hqdefault.jpg"
    }
]

# 5. Anti-Depression (Calm, Healing, Acoustic Hindi)
antidepression_tracks = [
    {
        "id": "fSS_R91Nimw",
        "title": "Iktara (Wake Up Sid)",
        "artist": "Amit Trivedi, Kavita Seth, Amitabh Bhattacharya",
        "duration": 254,
        "cover": "https://img.youtube.com/vi/fSS_R91Nimw/hqdefault.jpg"
    },
    {
        "id": "jHNNMj5bNQw",
        "title": "Kabira (Acoustic)",
        "artist": "Tochi Raina & Rekha Bhardwaj",
        "duration": 223,
        "cover": "https://img.youtube.com/vi/jHNNMj5bNQw/hqdefault.jpg"
    },
    {
        "id": "h_fM2eJv2y4",
        "title": "Sham (Aisha)",
        "artist": "Amit Trivedi & Nikhil D'Souza",
        "duration": 284,
        "cover": "https://img.youtube.com/vi/h_fM2eJv2y4/hqdefault.jpg"
    },
    {
        "id": "V476m5_t-zM",
        "title": "Baarishein",
        "artist": "Anuv Jain",
        "duration": 208,
        "cover": "https://img.youtube.com/vi/V476m5_t-zM/hqdefault.jpg"
    },
    {
        "id": "fBRf_pT8hQw",
        "title": "Alag Aasman",
        "artist": "Anuv Jain",
        "duration": 230,
        "cover": "https://img.youtube.com/vi/fBRf_pT8hQw/hqdefault.jpg"
    },
    {
        "id": "0B1zKzUv56M",
        "title": "Kun Faya Kun (Peaceful)",
        "artist": "A.R. Rahman",
        "duration": 472,
        "cover": "https://img.youtube.com/vi/0B1zKzUv56M/hqdefault.jpg"
    },
    {
        "id": "6B3_C7F3j_M",
        "title": "Phir Le Aya Dil",
        "artist": "Arijit Singh & Pritam",
        "duration": 305,
        "cover": "https://img.youtube.com/vi/6B3_C7F3j_M/hqdefault.jpg"
    }
]

# 6. Fred Again..
fredagain_tracks = [
    {
        "id": "vj0gNfB27jY",
        "title": "Delilah (pull me out of this)",
        "artist": "Fred again..",
        "duration": 250,
        "cover": "https://img.youtube.com/vi/vj0gNfB27jY/hqdefault.jpg"
    },
    {
        "id": "F77w_Hl60c8",
        "title": "Jungle",
        "artist": "Fred again..",
        "duration": 198,
        "cover": "https://img.youtube.com/vi/F77w_Hl60c8/hqdefault.jpg"
    },
    {
        "id": "qEkn0r9Vn_Q",
        "title": "Rumble",
        "artist": "Skrillex, Fred again.. & Flowdan",
        "duration": 146,
        "cover": "https://img.youtube.com/vi/qEkn0r9Vn_Q/hqdefault.jpg"
    },
    {
        "id": "U31y_s9q_t0",
        "title": "leavemealone",
        "artist": "Fred again.. & Baby Keem",
        "duration": 222,
        "cover": "https://img.youtube.com/vi/U31y_s9q_t0/hqdefault.jpg"
    },
    {
        "id": "N3dJ_p7l9iU",
        "title": "adore u",
        "artist": "Fred again.. & Obongjayar",
        "duration": 220,
        "cover": "https://img.youtube.com/vi/N3dJ_p7l9iU/hqdefault.jpg"
    },
    {
        "id": "g-5Vf0N24d0",
        "title": "Marea (we've lost dancing)",
        "artist": "Fred again.. & The Blessed Madonna",
        "duration": 285,
        "cover": "https://img.youtube.com/vi/g-5Vf0N24d0/hqdefault.jpg"
    }
]

stations_db = {
    "highway": highway_tracks,
    "dhaba": dhaba_tracks,
    "dance2000": dance2000_tracks,
    "retro90s": retro90s_tracks,
    "antidepression": antidepression_tracks,
    "fredagain": fredagain_tracks
}

with open("stations_tracks.json", "w", encoding="utf-8") as f:
    json.dump(stations_db, f, indent=2)

print("Generated stations_tracks.json with all stations!")
