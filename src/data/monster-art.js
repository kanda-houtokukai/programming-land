// 9体のアート（viewBox 0 0 200 200 の中身。ギャラリー承認版そのまま）
export const MONSTER_ART = {
  "moko-1": `
<defs>
              <radialGradient id="m1b" cx="36%" cy="30%" r="80%">
                <stop offset="0%" stop-color="#DFF7D4"/><stop offset="45%" stop-color="#A8E0A0"/>
                <stop offset="78%" stop-color="#6BCB77"/><stop offset="100%" stop-color="#47945A"/>
              </radialGradient>
              <linearGradient id="m1l" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#9FE39B"/><stop offset="100%" stop-color="#3E9457"/>
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="174" rx="42" ry="9" fill="#3A6B45" opacity=".18"/>
            <path d="M100 80 C100 68 103 61 108 55" stroke="#4CAF63" stroke-width="5" fill="none" stroke-linecap="round"/>
            <ellipse cx="86" cy="60" rx="15" ry="9" fill="url(#m1l)" transform="rotate(-34 86 60)"/>
            <ellipse cx="118" cy="50" rx="16" ry="9.5" fill="url(#m1l)" transform="rotate(28 118 50)"/>
            <path d="M76 66 L96 54" stroke="#2F7A44" stroke-width="1.6" opacity=".5" transform="rotate(-2 86 60)"/>
            <circle cx="100" cy="126" r="48" fill="url(#m1b)"/>
            <ellipse cx="100" cy="142" rx="27" ry="21" fill="#EAFBE0" opacity=".8"/>
            <ellipse cx="80" cy="98" rx="15" ry="9" fill="#fff" opacity=".5" transform="rotate(-24 80 98)"/>
            <circle cx="70" cy="112" r="3.5" fill="#fff" opacity=".45"/>
            <ellipse cx="87" cy="124" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <ellipse cx="113" cy="124" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <circle cx="85" cy="121" r="2.4" fill="#fff"/><circle cx="111" cy="121" r="2.4" fill="#fff"/>
            <circle cx="89.5" cy="127" r="1.1" fill="#fff" opacity=".8"/><circle cx="115.5" cy="127" r="1.1" fill="#fff" opacity=".8"/>
            <ellipse cx="72" cy="136" rx="6.5" ry="4.5" fill="#FFA9BE" opacity=".75"/>
            <ellipse cx="128" cy="136" rx="6.5" ry="4.5" fill="#FFA9BE" opacity=".75"/>
            <path d="M93 137 Q100 144 107 137" stroke="#2E2A2C" stroke-width="3" fill="none" stroke-linecap="round"/>
`,
  "moko-2": `
<defs>
              <radialGradient id="m2b" cx="36%" cy="28%" r="82%">
                <stop offset="0%" stop-color="#D2F2C6"/><stop offset="45%" stop-color="#8ED88C"/>
                <stop offset="80%" stop-color="#57B368"/><stop offset="100%" stop-color="#3B8B50"/>
              </radialGradient>
              <linearGradient id="m2l" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#A9E8A1"/><stop offset="100%" stop-color="#379050"/>
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="178" rx="48" ry="9" fill="#3A6B45" opacity=".18"/>
            <!-- しっぽの はっぱ -->
            <ellipse cx="152" cy="146" rx="20" ry="11" fill="url(#m2l)" transform="rotate(24 152 146)"/>
            <path d="M136 142 L166 152" stroke="#2F7A44" stroke-width="1.6" opacity=".5"/>
            <!-- みみ -->
            <ellipse cx="62" cy="62" rx="22" ry="12" fill="url(#m2l)" transform="rotate(-40 62 62)"/>
            <ellipse cx="138" cy="62" rx="22" ry="12" fill="url(#m2l)" transform="rotate(40 138 62)"/>
            <!-- あしと て -->
            <ellipse cx="74" cy="168" rx="13" ry="9" fill="#3E9457"/>
            <ellipse cx="126" cy="168" rx="13" ry="9" fill="#3E9457"/>
            <ellipse cx="56" cy="132" rx="9" ry="12" fill="#57B368" transform="rotate(-18 56 132)"/>
            <ellipse cx="144" cy="132" rx="9" ry="12" fill="#57B368" transform="rotate(18 144 132)"/>
            <!-- からだ と あたま -->
            <ellipse cx="100" cy="140" rx="35" ry="30" fill="url(#m2b)"/>
            <circle cx="100" cy="88" r="38" fill="url(#m2b)"/>
            <!-- あたまの め -->
            <path d="M100 52 C100 44 102 39 106 35" stroke="#4CAF63" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="90" cy="38" rx="11" ry="6.5" fill="url(#m2l)" transform="rotate(-30 90 38)"/>
            <ellipse cx="114" cy="33" rx="12" ry="7" fill="url(#m2l)" transform="rotate(26 114 33)"/>
            <!-- おなか（はっぱがた） -->
            <path d="M100 122 C118 126 122 146 100 162 C78 146 82 126 100 122 Z" fill="#E4F8D8" opacity=".85"/>
            <path d="M100 126 L100 156" stroke="#8CC98A" stroke-width="2" opacity=".7"/>
            <!-- ハイライト -->
            <ellipse cx="82" cy="66" rx="13" ry="8" fill="#fff" opacity=".5" transform="rotate(-24 82 66)"/>
            <circle cx="72" cy="80" r="3" fill="#fff" opacity=".45"/>
            <!-- かお -->
            <ellipse cx="85" cy="88" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <ellipse cx="115" cy="88" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <circle cx="83" cy="85" r="2.8" fill="#fff"/><circle cx="113" cy="85" r="2.8" fill="#fff"/>
            <circle cx="87.5" cy="91" r="1.3" fill="#fff" opacity=".8"/><circle cx="117.5" cy="91" r="1.3" fill="#fff" opacity=".8"/>
            <ellipse cx="68" cy="100" rx="7" ry="5" fill="#FFA9BE" opacity=".75"/>
            <ellipse cx="132" cy="100" rx="7" ry="5" fill="#FFA9BE" opacity=".75"/>
            <path d="M91 101 Q100 110 109 101" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
`,
  "moko-3": `
<defs>
              <radialGradient id="m3b" cx="36%" cy="26%" r="85%">
                <stop offset="0%" stop-color="#BCEAAE"/><stop offset="45%" stop-color="#6FC97D"/>
                <stop offset="80%" stop-color="#3E9E58"/><stop offset="100%" stop-color="#276E3E"/>
              </radialGradient>
              <linearGradient id="m3cape" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#4FAE63"/><stop offset="100%" stop-color="#1F5C33"/>
              </linearGradient>
              <linearGradient id="m3l" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#A9E8A1"/><stop offset="100%" stop-color="#2F8447"/>
              </linearGradient>
              <radialGradient id="m3g" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stop-color="#FFF3B0"/><stop offset="60%" stop-color="#FFD447"/><stop offset="100%" stop-color="#E0A81F"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="182" rx="58" ry="10" fill="#2E5C3B" opacity=".2"/>
            <!-- はっぱの マント（うしろ） -->
            <g fill="url(#m3cape)">
              <path d="M100 70 C56 74 34 110 40 160 C58 150 64 150 70 158 C76 146 84 146 92 154 L100 96 Z"/>
              <path d="M100 70 C144 74 166 110 160 160 C142 150 136 150 130 158 C124 146 116 146 108 154 L100 96 Z"/>
            </g>
            <path d="M62 100 C54 118 52 136 54 150" stroke="#174D28" stroke-width="2" opacity=".5" fill="none"/>
            <path d="M138 100 C146 118 148 136 146 150" stroke="#174D28" stroke-width="2" opacity=".5" fill="none"/>
            <!-- あし -->
            <ellipse cx="72" cy="172" rx="16" ry="11" fill="#2F8447"/>
            <ellipse cx="128" cy="172" rx="16" ry="11" fill="#2F8447"/>
            <path d="M64 168 L64 176 M72 166 L72 176" stroke="#1F5C33" stroke-width="2.4" opacity=".6"/>
            <path d="M120 166 L120 176 M128 166 L128 176" stroke="#1F5C33" stroke-width="2.4" opacity=".6"/>
            <!-- うで（はっぱの て） -->
            <ellipse cx="52" cy="128" rx="11" ry="17" fill="url(#m3l)" transform="rotate(-22 52 128)"/>
            <ellipse cx="148" cy="128" rx="11" ry="17" fill="url(#m3l)" transform="rotate(22 148 128)"/>
            <!-- からだ -->
            <path d="M100 84 C136 84 148 116 144 142 C140 164 122 172 100 172 C78 172 60 164 56 142 C52 116 64 84 100 84 Z" fill="url(#m3b)"/>
            <!-- むねの はっぱプレート -->
            <path d="M100 104 C124 110 128 138 100 160 C72 138 76 110 100 104 Z" fill="#DCF5CB" opacity=".9"/>
            <path d="M100 108 L100 154 M100 120 L88 128 M100 120 L112 128 M100 134 L86 142 M100 134 L114 142" stroke="#7FBF78" stroke-width="2" fill="none" opacity=".8"/>
            <!-- つるの うずまき -->
            <path d="M64 112 q-8 6 -2 12 q5 5 9 -1" stroke="#1F5C33" stroke-width="2.4" fill="none" opacity=".7"/>
            <path d="M136 112 q8 6 2 12 q-5 5 -9 -1" stroke="#1F5C33" stroke-width="2.4" fill="none" opacity=".7"/>
            <!-- あたま -->
            <circle cx="100" cy="70" r="34" fill="url(#m3b)"/>
            <!-- かんむり（はっぱ 5まい ＋ きんの はな） -->
            <g fill="url(#m3l)">
              <ellipse cx="100" cy="32" rx="9" ry="15"/>
              <ellipse cx="78" cy="38" rx="8" ry="13" transform="rotate(-26 78 38)"/>
              <ellipse cx="122" cy="38" rx="8" ry="13" transform="rotate(26 122 38)"/>
              <ellipse cx="60" cy="52" rx="7" ry="11" transform="rotate(-52 60 52)"/>
              <ellipse cx="140" cy="52" rx="7" ry="11" transform="rotate(52 140 52)"/>
            </g>
            <g transform="translate(100 44)">
              <circle r="4" fill="url(#m3g)"/>
              <g fill="url(#m3g)">
                <ellipse cx="0" cy="-7" rx="3.4" ry="4.4"/><ellipse cx="6.6" cy="-2.2" rx="3.4" ry="4.4" transform="rotate(72 6.6 -2.2)"/>
                <ellipse cx="4.1" cy="5.7" rx="3.4" ry="4.4" transform="rotate(144 4.1 5.7)"/><ellipse cx="-4.1" cy="5.7" rx="3.4" ry="4.4" transform="rotate(216 -4.1 5.7)"/>
                <ellipse cx="-6.6" cy="-2.2" rx="3.4" ry="4.4" transform="rotate(288 -6.6 -2.2)"/>
              </g>
              <circle r="2.4" fill="#B57F12"/>
            </g>
            <!-- かおの ハイライト -->
            <ellipse cx="84" cy="52" rx="12" ry="7" fill="#fff" opacity=".5" transform="rotate(-22 84 52)"/>
            <!-- かお（りりしい め） -->
            <path d="M76 62 L94 66" stroke="#2E5C3B" stroke-width="3" stroke-linecap="round" opacity=".65"/>
            <path d="M124 62 L106 66" stroke="#2E5C3B" stroke-width="3" stroke-linecap="round" opacity=".65"/>
            <ellipse cx="86" cy="74" rx="7" ry="8" fill="#2E2A2C"/>
            <ellipse cx="114" cy="74" rx="7" ry="8" fill="#2E2A2C"/>
            <circle cx="84" cy="71" r="2.6" fill="#fff"/><circle cx="112" cy="71" r="2.6" fill="#fff"/>
            <circle cx="88.5" cy="77" r="1.2" fill="#fff" opacity=".8"/><circle cx="116.5" cy="77" r="1.2" fill="#fff" opacity=".8"/>
            <ellipse cx="70" cy="84" rx="6" ry="4.2" fill="#FFA9BE" opacity=".7"/>
            <ellipse cx="130" cy="84" rx="6" ry="4.2" fill="#FFA9BE" opacity=".7"/>
            <path d="M92 86 Q100 94 108 86" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <!-- ボディのハイライト・まいちる はっぱ -->
            <ellipse cx="74" cy="106" rx="10" ry="6" fill="#fff" opacity=".35" transform="rotate(-20 74 106)"/>
            <ellipse cx="36" cy="84" rx="6" ry="3.5" fill="#8ED88C" transform="rotate(-30 36 84)" opacity=".9"/>
            <ellipse cx="168" cy="70" rx="5" ry="3" fill="#8ED88C" transform="rotate(24 168 70)" opacity=".9"/>
            <ellipse cx="176" cy="118" rx="5" ry="3" fill="#6FC97D" transform="rotate(-16 176 118)" opacity=".9"/>
`,
  "shizuku-1": `
<defs>
              <radialGradient id="s1b" cx="36%" cy="30%" r="82%">
                <stop offset="0%" stop-color="#EAF9FF"/><stop offset="45%" stop-color="#A6DCF7"/>
                <stop offset="78%" stop-color="#5BB0E8"/><stop offset="100%" stop-color="#2F7FB8"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="172" rx="40" ry="9" fill="#2C5D80" opacity=".18"/>
            <path d="M100 60 C134 104 138 150 100 162 C62 150 66 104 100 60 Z" fill="url(#s1b)"/>
            <ellipse cx="84" cy="98" rx="12" ry="18" fill="#fff" opacity=".55" transform="rotate(14 84 98)"/>
            <circle cx="78" cy="126" r="3.5" fill="#fff" opacity=".5"/>
            <circle cx="134" cy="78" r="4.5" fill="#BFE7FB" opacity=".9"/>
            <circle cx="146" cy="94" r="3" fill="#BFE7FB" opacity=".8"/>
            <circle cx="56" cy="86" r="3.4" fill="#BFE7FB" opacity=".8"/>
            <ellipse cx="88" cy="130" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <ellipse cx="112" cy="130" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <circle cx="86" cy="127" r="2.4" fill="#fff"/><circle cx="110" cy="127" r="2.4" fill="#fff"/>
            <circle cx="90.5" cy="133" r="1.1" fill="#fff" opacity=".8"/><circle cx="114.5" cy="133" r="1.1" fill="#fff" opacity=".8"/>
            <ellipse cx="74" cy="141" rx="6" ry="4.2" fill="#FFA9BE" opacity=".7"/>
            <ellipse cx="126" cy="141" rx="6" ry="4.2" fill="#FFA9BE" opacity=".7"/>
            <path d="M93 142 Q100 149 107 142" stroke="#2E2A2C" stroke-width="3" fill="none" stroke-linecap="round"/>
`,
  "shizuku-2": `
<defs>
              <radialGradient id="s2b" cx="36%" cy="28%" r="82%">
                <stop offset="0%" stop-color="#D8F1FE"/><stop offset="45%" stop-color="#8FCDF6"/>
                <stop offset="80%" stop-color="#4C9FDB"/><stop offset="100%" stop-color="#2A6FA6"/>
              </radialGradient>
              <linearGradient id="s2f" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#C4E9FC"/><stop offset="100%" stop-color="#3E8FC9"/>
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="178" rx="48" ry="9" fill="#2C5D80" opacity=".18"/>
            <!-- おびれ（うしろ） -->
            <path d="M148 140 Q176 128 172 156 Q158 152 146 152 Z" fill="url(#s2f)"/>
            <!-- ひれみみ -->
            <path d="M56 66 Q30 52 34 86 Q46 80 60 80 Z" fill="url(#s2f)"/>
            <path d="M144 66 Q170 52 166 86 Q154 80 140 80 Z" fill="url(#s2f)"/>
            <path d="M42 66 L46 80 M50 60 L54 78" stroke="#2A6FA6" stroke-width="1.6" opacity=".5"/>
            <path d="M158 66 L154 80 M150 60 L146 78" stroke="#2A6FA6" stroke-width="1.6" opacity=".5"/>
            <!-- あし・て -->
            <ellipse cx="76" cy="168" rx="13" ry="9" fill="#3E8FC9"/>
            <ellipse cx="124" cy="168" rx="13" ry="9" fill="#3E8FC9"/>
            <ellipse cx="56" cy="130" rx="9" ry="13" fill="#4C9FDB" transform="rotate(-16 56 130)"/>
            <ellipse cx="144" cy="130" rx="9" ry="13" fill="#4C9FDB" transform="rotate(16 144 130)"/>
            <!-- からだ・あたま -->
            <ellipse cx="100" cy="138" rx="36" ry="31" fill="url(#s2b)"/>
            <circle cx="100" cy="86" r="38" fill="url(#s2b)"/>
            <!-- なみの とさか -->
            <path d="M84 52 Q86 34 104 36 Q96 40 96 48 Q108 40 118 48 Q108 46 104 54 Z" fill="#DFF3FF"/>
            <path d="M84 52 Q86 34 104 36" stroke="#8FCDF6" stroke-width="2" fill="none" opacity=".6"/>
            <!-- おなか -->
            <ellipse cx="100" cy="142" rx="24" ry="20" fill="#EAF8FF" opacity=".9"/>
            <path d="M82 136 Q100 130 118 136" stroke="#A9D9F6" stroke-width="2" fill="none" opacity=".8"/>
            <path d="M84 146 Q100 140 116 146" stroke="#A9D9F6" stroke-width="2" fill="none" opacity=".8"/>
            <!-- ハイライト -->
            <ellipse cx="82" cy="64" rx="13" ry="8" fill="#fff" opacity=".55" transform="rotate(-24 82 64)"/>
            <circle cx="72" cy="78" r="3" fill="#fff" opacity=".5"/>
            <!-- かお -->
            <ellipse cx="85" cy="86" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <ellipse cx="115" cy="86" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <circle cx="83" cy="83" r="2.8" fill="#fff"/><circle cx="113" cy="83" r="2.8" fill="#fff"/>
            <circle cx="87.5" cy="89" r="1.3" fill="#fff" opacity=".8"/><circle cx="117.5" cy="89" r="1.3" fill="#fff" opacity=".8"/>
            <ellipse cx="68" cy="98" rx="7" ry="5" fill="#FFA9BE" opacity=".7"/>
            <ellipse cx="132" cy="98" rx="7" ry="5" fill="#FFA9BE" opacity=".7"/>
            <path d="M91 99 Q100 108 109 99" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <circle cx="152" cy="56" r="4" fill="#BFE7FB" opacity=".9"/>
            <circle cx="44" cy="104" r="3" fill="#BFE7FB" opacity=".8"/>
`,
  "shizuku-3": `
<defs>
              <radialGradient id="s3b" cx="36%" cy="26%" r="85%">
                <stop offset="0%" stop-color="#A8D9F8"/><stop offset="45%" stop-color="#5AA7E3"/>
                <stop offset="80%" stop-color="#2F7FC2"/><stop offset="100%" stop-color="#1D5687"/>
              </radialGradient>
              <linearGradient id="s3w" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#EAF8FF"/><stop offset="55%" stop-color="#7FC2F0"/><stop offset="100%" stop-color="#2F7FC2"/>
              </linearGradient>
              <radialGradient id="s3p" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stop-color="#FFFDF6"/><stop offset="60%" stop-color="#FFEFCD"/><stop offset="100%" stop-color="#E8C285"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="182" rx="58" ry="10" fill="#1D5687" opacity=".2"/>
            <!-- おおなみの たてがみ（うしろ） -->
            <g fill="url(#s3w)">
              <path d="M100 60 C64 48 38 62 36 96 Q52 88 50 104 C36 118 40 140 56 148 Q58 132 70 134 L96 96 Z"/>
              <path d="M100 60 C136 48 162 62 164 96 Q148 88 150 104 C164 118 160 140 144 148 Q142 132 130 134 L104 96 Z"/>
              <path d="M100 44 C86 30 62 32 58 50 Q74 44 76 56 L98 64 Z"/>
              <path d="M100 44 C114 30 138 32 142 50 Q126 44 124 56 L102 64 Z"/>
            </g>
            <path d="M48 92 q-8 8 0 14 q7 5 11 -2" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
            <path d="M152 92 q8 8 0 14 q-7 5 -11 -2" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
            <!-- おびれ（よこ） -->
            <path d="M150 150 Q184 138 178 168 Q162 162 148 164 Z" fill="url(#s3w)"/>
            <path d="M162 150 L166 162 M170 146 L172 160" stroke="#2F7FC2" stroke-width="1.8" opacity=".5"/>
            <!-- あし -->
            <ellipse cx="72" cy="172" rx="16" ry="11" fill="#2F7FC2"/>
            <ellipse cx="128" cy="172" rx="16" ry="11" fill="#2F7FC2"/>
            <!-- うで（ひれリボン） -->
            <path d="M54 118 Q34 128 40 150 Q52 142 58 144 Q50 132 60 126 Z" fill="url(#s3w)"/>
            <path d="M146 118 Q166 128 160 150 Q148 142 142 144 Q150 132 140 126 Z" fill="url(#s3w)"/>
            <!-- からだ -->
            <path d="M100 84 C136 84 148 116 144 142 C140 164 122 172 100 172 C78 172 60 164 56 142 C52 116 64 84 100 84 Z" fill="url(#s3b)"/>
            <!-- しんじゅいろの おなか＋うろこせん -->
            <path d="M100 104 C122 110 128 138 100 162 C72 138 78 110 100 104 Z" fill="url(#s3p)"/>
            <path d="M84 122 Q100 114 116 122 M82 134 Q100 126 118 134 M84 146 Q100 138 116 146" stroke="#D9AF74" stroke-width="2" fill="none" opacity=".7"/>
            <!-- むねの うずまきホラガイ -->
            <g transform="translate(100 118)">
              <circle r="8.5" fill="url(#s3p)"/>
              <path d="M0 -6 a6 6 0 0 1 6 6 a6 6 0 0 1 -6 6 a4.2 4.2 0 0 1 -4.2 -4.2 a3 3 0 0 1 3 -3 a1.8 1.8 0 0 1 1.8 1.8" stroke="#B98A4C" stroke-width="2" fill="none" stroke-linecap="round"/>
            </g>
            <!-- あたま -->
            <circle cx="100" cy="70" r="34" fill="url(#s3b)"/>
            <!-- ひたいの しんじゅ -->
            <circle cx="100" cy="44" r="7" fill="url(#s3p)"/>
            <circle cx="98" cy="42" r="2.2" fill="#fff" opacity=".9"/>
            <circle cx="100" cy="44" r="10.5" fill="#EAF8FF" opacity=".35"/>
            <!-- ハイライト -->
            <ellipse cx="84" cy="52" rx="12" ry="7" fill="#fff" opacity=".5" transform="rotate(-22 84 52)"/>
            <!-- りりしい め -->
            <path d="M76 60 L94 64" stroke="#1D5687" stroke-width="3" stroke-linecap="round" opacity=".7"/>
            <path d="M124 60 L106 64" stroke="#1D5687" stroke-width="3" stroke-linecap="round" opacity=".7"/>
            <ellipse cx="86" cy="72" rx="7" ry="8" fill="#2E2A2C"/>
            <ellipse cx="114" cy="72" rx="7" ry="8" fill="#2E2A2C"/>
            <circle cx="84" cy="69" r="2.6" fill="#fff"/><circle cx="112" cy="69" r="2.6" fill="#fff"/>
            <circle cx="88.5" cy="75" r="1.2" fill="#fff" opacity=".8"/><circle cx="116.5" cy="75" r="1.2" fill="#fff" opacity=".8"/>
            <ellipse cx="70" cy="82" rx="6" ry="4.2" fill="#FFA9BE" opacity=".65"/>
            <ellipse cx="130" cy="82" rx="6" ry="4.2" fill="#FFA9BE" opacity=".65"/>
            <path d="M92 84 Q100 92 108 84" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <!-- ボディハイライト・しぶき -->
            <ellipse cx="74" cy="104" rx="10" ry="6" fill="#fff" opacity=".35" transform="rotate(-20 74 104)"/>
            <circle cx="34" cy="70" r="4" fill="#BFE7FB"/>
            <circle cx="170" cy="62" r="3.4" fill="#BFE7FB"/>
            <circle cx="182" cy="112" r="3" fill="#BFE7FB"/>
            <circle cx="22" cy="120" r="2.6" fill="#BFE7FB"/>
`,
  "hoshi-1": `
<defs>
              <radialGradient id="h1b" cx="36%" cy="30%" r="82%">
                <stop offset="0%" stop-color="#F3EBFF"/><stop offset="45%" stop-color="#C9B4EC"/>
                <stop offset="78%" stop-color="#9D7BD8"/><stop offset="100%" stop-color="#6C4BAE"/>
              </radialGradient>
              <radialGradient id="h1s" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stop-color="#FFF6C4"/><stop offset="60%" stop-color="#FFD447"/><stop offset="100%" stop-color="#E0A81F"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="172" rx="40" ry="9" fill="#4A3577" opacity=".18"/>
            <path d="M100 82 C100 70 101 64 104 58" stroke="#B49AE0" stroke-width="5" fill="none" stroke-linecap="round"/>
            <g transform="translate(105 48)">
              <polygon points="0,-16 4.2,-5.7 15.2,-5 6.6,2.1 9.4,12.9 0,7 -9.4,12.9 -6.6,2.1 -15.2,-5 -4.2,-5.7" fill="url(#h1s)"/>
              <circle r="20" fill="#FFD447" opacity=".18"/>
            </g>
            <circle cx="100" cy="126" r="48" fill="url(#h1b)"/>
            <ellipse cx="100" cy="142" rx="27" ry="21" fill="#F1E9FD" opacity=".8"/>
            <ellipse cx="80" cy="98" rx="15" ry="9" fill="#fff" opacity=".5" transform="rotate(-24 80 98)"/>
            <circle cx="70" cy="112" r="3.5" fill="#fff" opacity=".45"/>
            <ellipse cx="87" cy="124" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <ellipse cx="113" cy="124" rx="6.5" ry="7.5" fill="#2E2A2C"/>
            <circle cx="85" cy="121" r="2.4" fill="#fff"/><circle cx="111" cy="121" r="2.4" fill="#fff"/>
            <circle cx="89.5" cy="127" r="1.1" fill="#fff" opacity=".8"/><circle cx="115.5" cy="127" r="1.1" fill="#fff" opacity=".8"/>
            <ellipse cx="72" cy="136" rx="6.5" ry="4.5" fill="#FFA9BE" opacity=".75"/>
            <ellipse cx="128" cy="136" rx="6.5" ry="4.5" fill="#FFA9BE" opacity=".75"/>
            <path d="M93 137 Q100 144 107 137" stroke="#2E2A2C" stroke-width="3" fill="none" stroke-linecap="round"/>
            <circle cx="146" cy="120" r="2.6" fill="#FFD447"/>
            <circle cx="54" cy="90" r="2.2" fill="#FFD447"/>
`,
  "hoshi-2": `
<defs>
              <radialGradient id="h2b" cx="36%" cy="28%" r="82%">
                <stop offset="0%" stop-color="#E7DAFB"/><stop offset="45%" stop-color="#B598E4"/>
                <stop offset="80%" stop-color="#8A64C9"/><stop offset="100%" stop-color="#5E3F9E"/>
              </radialGradient>
              <radialGradient id="h2s" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stop-color="#FFF6C4"/><stop offset="60%" stop-color="#FFD447"/><stop offset="100%" stop-color="#E0A81F"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="178" rx="48" ry="9" fill="#4A3577" opacity=".18"/>
            <!-- ほしみみ -->
            <path d="M66 62 L60 44" stroke="#8A64C9" stroke-width="5" stroke-linecap="round"/>
            <path d="M134 62 L140 44" stroke="#8A64C9" stroke-width="5" stroke-linecap="round"/>
            <g transform="translate(58 38)"><polygon points="0,-12 3.1,-4.2 11.4,-3.7 4.9,1.6 7,9.7 0,5.3 -7,9.7 -4.9,1.6 -11.4,-3.7 -3.1,-4.2" fill="url(#h2s)"/></g>
            <g transform="translate(142 38)"><polygon points="0,-12 3.1,-4.2 11.4,-3.7 4.9,1.6 7,9.7 0,5.3 -7,9.7 -4.9,1.6 -11.4,-3.7 -3.1,-4.2" fill="url(#h2s)"/></g>
            <!-- ちいさな つばさ -->
            <path d="M52 118 Q34 112 38 130 Q48 128 56 130 Z" fill="#D9C8F4"/>
            <path d="M148 118 Q166 112 162 130 Q152 128 144 130 Z" fill="#D9C8F4"/>
            <!-- あし・て -->
            <ellipse cx="76" cy="168" rx="13" ry="9" fill="#6C4BAE"/>
            <ellipse cx="124" cy="168" rx="13" ry="9" fill="#6C4BAE"/>
            <ellipse cx="58" cy="134" rx="9" ry="12" fill="#8A64C9" transform="rotate(-16 58 134)"/>
            <ellipse cx="142" cy="134" rx="9" ry="12" fill="#8A64C9" transform="rotate(16 142 134)"/>
            <!-- からだ・あたま -->
            <ellipse cx="100" cy="140" rx="35" ry="30" fill="url(#h2b)"/>
            <circle cx="100" cy="88" r="38" fill="url(#h2b)"/>
            <!-- おなかの みかづき -->
            <path d="M108 128 a17 17 0 1 0 4 26 a13 13 0 1 1 -4 -26 Z" fill="url(#h2s)" transform="rotate(-18 104 142)"/>
            <!-- ハイライト -->
            <ellipse cx="82" cy="66" rx="13" ry="8" fill="#fff" opacity=".5" transform="rotate(-24 82 66)"/>
            <circle cx="72" cy="80" r="3" fill="#fff" opacity=".45"/>
            <!-- かお -->
            <ellipse cx="85" cy="88" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <ellipse cx="115" cy="88" rx="7.5" ry="8.5" fill="#2E2A2C"/>
            <circle cx="83" cy="85" r="2.8" fill="#fff"/><circle cx="113" cy="85" r="2.8" fill="#fff"/>
            <circle cx="87.5" cy="91" r="1.3" fill="#fff" opacity=".8"/><circle cx="117.5" cy="91" r="1.3" fill="#fff" opacity=".8"/>
            <ellipse cx="68" cy="100" rx="7" ry="5" fill="#FFA9BE" opacity=".7"/>
            <ellipse cx="132" cy="100" rx="7" ry="5" fill="#FFA9BE" opacity=".7"/>
            <path d="M91 101 Q100 110 109 101" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <circle cx="160" cy="70" r="2.6" fill="#FFD447"/>
            <circle cx="40" cy="90" r="2.2" fill="#FFD447"/>
            <circle cx="170" cy="150" r="2.2" fill="#FFD447"/>
`,
  "hoshi-3": `
<defs>
              <radialGradient id="h3b" cx="36%" cy="26%" r="85%">
                <stop offset="0%" stop-color="#CDb6F0"/><stop offset="45%" stop-color="#9B76D6"/>
                <stop offset="80%" stop-color="#6E4BB4"/><stop offset="100%" stop-color="#452A7C"/>
              </radialGradient>
              <linearGradient id="h3c" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6E4BB4"/><stop offset="100%" stop-color="#2A1A52"/>
              </linearGradient>
              <radialGradient id="h3s" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stop-color="#FFF6C4"/><stop offset="60%" stop-color="#FFD447"/><stop offset="100%" stop-color="#DFA30F"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="182" rx="58" ry="10" fill="#2A1A52" opacity=".22"/>
            <!-- ながれぼしの マント（うしろ） -->
            <g fill="url(#h3c)">
              <path d="M100 66 C58 70 36 104 42 162 C54 150 62 152 68 160 C74 148 84 148 92 156 L100 96 Z"/>
              <path d="M100 66 C142 70 164 104 158 162 C146 150 138 152 132 160 C126 148 116 148 108 156 L100 96 Z"/>
            </g>
            <g fill="#FFE68A">
              <circle cx="60" cy="112" r="2.6"/><circle cx="74" cy="136" r="2.2"/><circle cx="52" cy="142" r="1.8"/>
              <circle cx="140" cy="112" r="2.6"/><circle cx="126" cy="136" r="2.2"/><circle cx="148" cy="142" r="1.8"/>
            </g>
            <!-- きどうリング（うしろ半分） -->
            <path d="M28 118 A72 22 0 0 1 172 118" stroke="#FFD447" stroke-width="4" fill="none" opacity=".5"/>
            <!-- あし -->
            <ellipse cx="72" cy="172" rx="16" ry="11" fill="#5E3F9E"/>
            <ellipse cx="128" cy="172" rx="16" ry="11" fill="#5E3F9E"/>
            <!-- つばさ -->
            <path d="M48 108 Q22 96 26 126 Q38 120 50 124 Q42 114 52 110 Z" fill="#D9C8F4"/>
            <path d="M152 108 Q178 96 174 126 Q162 120 150 124 Q158 114 148 110 Z" fill="#D9C8F4"/>
            <!-- からだ -->
            <path d="M100 84 C136 84 148 116 144 142 C140 164 122 172 100 172 C78 172 60 164 56 142 C52 116 64 84 100 84 Z" fill="url(#h3b)"/>
            <!-- おなか＋みかづきエンブレム -->
            <path d="M100 104 C122 110 128 138 100 162 C72 138 78 110 100 104 Z" fill="#E9DFF9" opacity=".92"/>
            <g transform="translate(100 132) rotate(-16)">
              <path d="M8 -16 a18 18 0 1 0 5 30 a14 14 0 1 1 -5 -30 Z" fill="url(#h3s)"/>
            </g>
            <g transform="translate(114 120)"><polygon points="0,-6 1.6,-2.1 5.7,-1.9 2.5,0.8 3.5,4.8 0,2.6 -3.5,4.8 -2.5,0.8 -5.7,-1.9 -1.6,-2.1" fill="url(#h3s)"/></g>
            <!-- きどうリング（まえ半分） -->
            <path d="M28 118 A72 22 0 0 0 172 118" stroke="#FFD447" stroke-width="4.5" fill="none" opacity=".85"/>
            <circle cx="172" cy="118" r="5" fill="url(#h3s)"/>
            <!-- あたま -->
            <circle cx="100" cy="70" r="34" fill="url(#h3b)"/>
            <!-- きんの ほしかんむり -->
            <path d="M74 44 L126 44 L120 32 L110 40 L100 26 L90 40 L80 32 Z" fill="url(#h3s)" stroke="#B57F12" stroke-width="1.6" stroke-linejoin="round"/>
            <g transform="translate(100 20)"><polygon points="0,-9 2.3,-3.1 8.6,-2.8 3.7,1.2 5.3,7.3 0,4 -5.3,7.3 -3.7,1.2 -8.6,-2.8 -2.3,-3.1" fill="url(#h3s)"/></g>
            <!-- ハイライト -->
            <ellipse cx="84" cy="54" rx="12" ry="7" fill="#fff" opacity=".5" transform="rotate(-22 84 54)"/>
            <!-- りりしい め -->
            <path d="M76 60 L94 64" stroke="#452A7C" stroke-width="3" stroke-linecap="round" opacity=".7"/>
            <path d="M124 60 L106 64" stroke="#452A7C" stroke-width="3" stroke-linecap="round" opacity=".7"/>
            <ellipse cx="86" cy="72" rx="7" ry="8" fill="#2E2A2C"/>
            <ellipse cx="114" cy="72" rx="7" ry="8" fill="#2E2A2C"/>
            <circle cx="84" cy="69" r="2.6" fill="#fff"/><circle cx="112" cy="69" r="2.6" fill="#fff"/>
            <circle cx="88.5" cy="75" r="1.2" fill="#fff" opacity=".8"/><circle cx="116.5" cy="75" r="1.2" fill="#fff" opacity=".8"/>
            <ellipse cx="70" cy="82" rx="6" ry="4.2" fill="#FFA9BE" opacity=".6"/>
            <ellipse cx="130" cy="82" rx="6" ry="4.2" fill="#FFA9BE" opacity=".6"/>
            <path d="M92 84 Q100 92 108 84" stroke="#2E2A2C" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <!-- ボディハイライト・ほし -->
            <ellipse cx="74" cy="104" rx="10" ry="6" fill="#fff" opacity=".3" transform="rotate(-20 74 104)"/>
            <g fill="#FFD447">
              <circle cx="30" cy="60" r="2.6"/><circle cx="176" cy="72" r="2.4"/>
              <circle cx="20" cy="140" r="2"/><circle cx="184" cy="150" r="2"/>
            </g>
`,
};
