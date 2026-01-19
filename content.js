/**
 * Grok Imagine Plus 1.8.1
 * Extensão para melhorar a experiência no Grok Imagine
 */

const DEFAULT_PROMPTS = [
  { id: "d1", text: "Cinematic portrait, soft lighting, 8k, highly detailed" },
  { id: "d2", text: "Cyberpunk city street, neon lights, rainy night, realistic" },
  { id: "d3", text: "Studio Ghibli style landscape, lush greenery, fluffy clouds" },
];

const FIXED_PROMPTS = [
  { id: "⚡", text: "[Ultra Mode]" },
  { id: "🌸", text: "[Anime Mode]" },
  { id: "🎉", text: "[Fun Mode]" },
  { id: "🔥", text: "[Spicy Mode]" },
  { id: "⛓️", text: "[BDSM Mode]" },
  { id: "🔞", text: "[NSFW Mode]" },
  { id: "©", text: "Remove all watermarks, signatures, Copyright, and texts." },
  { id: "👥", text: "Remove other people." },
  { id: "🖼️", text: "Remove background." },
  { id: "🔙", text: "Rear view." },
  { id: "🔜", text: "Front view." },
  { id: "👀", text: "Looking at Viewer." },
  { id: "🔍+", text: "Zoom in." },
  { id: "🔍-", text: "Zoom out." },
  { id: "⏱️", text: "Slow Motion." },
  {
    "id": "🧎‍♀️",
    "text": "On all fours, seductive arched back, looking back over shoulder."
  },
  {
    "id": "🤲",
    "text": "Grabbing own breasts sensually, hands cupping and squeezing firmly."
  },
  {
    "id": "🍑",
    "text": "Perfect round buttocks, firm and lifted, subtle sheen of oil."
  },
  {
    "id": "🫦",
    "text": "Wide hips and slim waist, perfect hourglass silhouette from side view."
  },
  {
    "id": "🐪",
    "text": "Rocking a pronounced fat camel toe, tight fabric clinging visibly."
  },
  {
    "id": "👐",
    "text": "Hands spreading buttocks apart, revealing curves teasingly."
  },
  {
    "id": "🔙",
    "text": "Bent over, ass up high, back deeply arched, legs slightly apart."
  },
  {
    "id": "💅",
    "text": "Fingertips tracing nipples, gentle pinch and tease."
  },
  {
    "id": "🌙",
    "text": "Side profile lying down, exaggerated S-curve of waist to hips."
  },
  {
    "id": "👄",
    "text": "Biting lower lip, chest thrust forward, cleavage emphasized."
  },
  {
    "id": "💋",
    "text": "Intimate close-up of passionate kissing, soft lips gently pressed together or deeply locked in a sensual French kiss, subtle tongue touch if explicit, warm flushed cheeks, half-closed eyes in ecstasy, delicate hands caressing face or neck, romantic candlelight or golden hour glow, cinematic shallow depth of field, hyper-detailed skin texture with natural pores and lip gloss sheen, sensual and tender mood."
  },
  {
    "id": "🦸‍♀️",  
    "text": "Stunning female superhero cosplay, powerful and seductive pose, tight form-fitting spandex or latex suit with iconic emblem on chest, flowing cape dramatically billowing, muscular yet feminine physique, thigh-high boots, confident heroic stance with hands on hips or fist raised, city skyline at night or dramatic storm background, dynamic lighting with rim lights and lens flares, ultra-detailed fabric texture, empowering and sexy vibe like Wonder Woman or Black Widow reimagined."
  },
  {
    "id": "🧚‍♀️",
    "text": "Enchanting fairy cosplay in seductive fantasy style, delicate translucent iridescent wings with glowing veins, skimpy ethereal dress made of leaves, flowers and sheer fabric that clings to curves, long flowing hair adorned with vines and sparkles, playful yet alluring pose in enchanted forest glade, soft magical bioluminescent lighting, floating particles and fireflies, dreamy pastel colors with golden highlights, highly detailed fantasy realism, cute but hypersexualized fairy aesthetic."
  },
  {
    "id": "🧛‍♀️",
    "text": "Seductive gothic vampire cosplay, pale porcelain skin, deep crimson lips, sharp visible fangs in a sultry smirk, hypnotic glowing red eyes, elegant black lace corset or velvet gown with plunging neckline, dramatic high collar cape, long dark wavy hair cascading over shoulders, mysterious castle interior or foggy moonlit graveyard background, moody low-key lighting with red accents and deep shadows, ultra-detailed skin veins and makeup, dark romantic and dangerously alluring vampire queen vibe."
  },
  {
    "id": "🛁",
    "text": "Sensual woman relaxing in a luxurious clawfoot bathtub overflowing with thick white foam bubbles, steam gently rising, wet hair clinging to neck and shoulders, relaxed yet provocative pose with arms draped on edges or one leg elegantly raised, soft candlelight and warm bathroom ambiance, golden volumetric god rays through window, hyper-realistic water reflections and bubble textures, intimate spa-like atmosphere, high detail on wet glistening skin and suds."
  },
  {
    "id": "💦",
    "text": "Hyper-detailed wet skin glistening with fresh water droplets, beads of water slowly trailing down curves and cleavage, post-shower or pool look, shiny reflective highlights on smooth skin, subtle oil-slick sheen, dramatic close-up or three-quarter view, soft diffused lighting emphasizing texture and moisture, sensual and fresh vibe, ultra-realistic subsurface scattering, visible fine body hair if natural, erotic water droplet focus."
  },
  {
    "id": "🌊",
    "text": "Tropical beach paradise scene at golden hour sunset, stunning woman in tiny micro bikini g-string and thong bottom, barely-there top, oiled bronzed skin shining under sunlight, waves gently lapping at feet, wind-swept hair, seductive pose walking out of turquoise water or lying on wet sand, dramatic backlit rim lighting, lens flare from sun, ultra-detailed sand texture and water droplets, vibrant Caribbean colors, summery and hypersexualized beach goddess aesthetic."
  },
  {
    "id": "👗",
    "text": "Elegant and provocative lingerie photoshoot, wearing a complete luxurious lace lingerie set: sheer black or red bra with intricate floral patterns, matching high-cut thong, garter belt with straps, full 7/8 sheer thigh-high stockings with lace tops, seductive pose on luxurious bed or chaise lounge, soft bedroom lighting with warm highlights and deep shadows, detailed lace texture and skin showing through sheer fabric, glamorous boudoir atmosphere, high fashion erotic style."
  },
  {
    "id": "😈",
    "text": "Extremely hypersexualized female character in a bold explicit pose, arched back, legs spread or on all fours, exaggerated curves, intense seductive expression with biting lip or tongue out, glossy oiled skin, minimal clothing or torn lingerie, provocative bedroom or dark fantasy setting, dramatic rim lighting and volumetric fog, ultra-detailed anatomy and skin texture, raw erotic energy, NSFW high-impact visual like high-end adult art or provocative glamour photography."
  },
  { id: "📸", 
    text: "Transform this image into an extreme photorealistic capture of a real person, hyper-detailed live-action movie still, actual real human captured on professional cinema camera like ARRI Alexa 65, authentic 35mm film grain Kodak Vision3 stock, natural human skin with visible pores, subtle imperfections, freckles, fine wrinkles, realistic subsurface scattering, natural sweat and oil sheen, razor-sharp focus on eyes with detailed iris and catchlights, shallow depth of field 85mm prime lens cinematic bokeh, dramatic volumetric lighting motivated by practical sources, raw unfiltered photograph straight out of a Hollywood blockbuster, 8K ultra-high resolution, insane micro-details on hair strands fabrics skin texture, casual imperfect framing slight lens distortion natural exposure, no cartoon no illustration no render no plastic skin no airbrushed no idealized smooth perfection, pure optical realism as if taken with a real lens in the real world."     
  },
  { id: "🥰", 
    text: "Transform this image into super kawaii chibi anime style, cute hand-drawn 2D cartoon illustration, big sparkling expressive anime eyes, huge head tiny body exaggerated proportions, vibrant cel-shading flat colors clean bold lineart, playful whimsical Studio Ghibli mixed with modern cute anime like Spy x Family or K-On, soft pastel palette glowing highlights sparkles, adorable deformed chibi character design, detailed manga-style facial expression energetic pose, no photorealism no realistic skin no pores no 3D render no live-action no human photo texture no cinematic grain, pure 2D animated screencap colorful flat shading ink outlines watercolor accents low detail stylized cute art." 
   },
   {
    "id": "🌌",  // Sci-Fi (futurista + espaço/guerra cósmica)
    "text": "Transform this image into epic hard sci-fi style, ultra-detailed cinematic science fiction scene, advanced futuristic technology, sleek metallic surfaces, glowing neon-blue holographic interfaces, massive starships, alien architecture, atmospheric haze, dramatic rim lighting, lens flares, 8K cinematic quality, photorealistic textures, Blade Runner 2049 + The Expanse + Dune aesthetic, deep space environment or high-tech megacity, realistic materials, no cartoon."
  },
  {
    "id": "🌃",  // Cyberpunk (noite neon + tecnologia suja)
    "text": "Transform into ultra-detailed cyberpunk aesthetic, neon-drenched rainy night megacity, dense holographic advertisements, flying cars, wet reflective streets, lots of pink/cyan/magenta neon glow, gritty dystopian atmosphere, Japanese signs, crowded street markets, cybernetic enhancements, visible cables and implants, Blade Runner + Ghost in the Shell + Cyberpunk 2077 vibe, cinematic volumetric fog, dramatic lighting, ultra-realistic details, 8K."
  },
  {
    "id": "🗡️",  // Fantasia (épica medieval mágica)
    "text": "Transform into high fantasy epic style, majestic fantasy world, ancient castles, floating islands, dragons in the sky, magical glowing runes, ethereal light beams, detailed armor and weapons, flowing capes, mystical forest or mountain kingdom, dramatic golden hour lighting, cinematic fantasy atmosphere like Lord of the Rings + The Witcher + Game of Thrones, ultra-detailed textures, painterly yet realistic, 8K resolution."
  },
  {
    "id": "🌀",  // Surrealismo (sonhador + impossível)
    "text": "Transform into pure surrealism art style, dream-like impossible scene, melting clocks, floating objects, distorted perspectives, bizarre combinations of elements, soft ethereal lighting, vibrant yet eerie color palette, Salvador Dalí + René Magritte + Zdzisław Beksiński influence, impossible architecture, levitating figures, paradoxical reality, highly detailed, atmospheric, uncanny and hypnotic mood, ultra-high resolution."
  },
  {
    "id": "🏋️‍♀️",
    "text": "Sensual athletic woman in gym deadlift pose, semi-nude with minimal sports bra and high-cut shorts, powerful hips thrust back, back arched gracefully showing defined muscles and sweat-glistened skin, dramatic gym lighting with rim lights highlighting curves and abs, intense focused expression, hyper-detailed muscle texture, veins and natural body sheen, photorealistic fitness erotic art, empowering strength and sensuality, 8K ultra-detailed."
  },
  {
    "id": "🏃‍♀️",
    "text": "Erotic runner mid-sprint on track at golden hour, semi-nude athletic figure in tiny running shorts and crop top slipping slightly, toned legs pumping powerfully, sweat beads trailing down abs and cleavage, wind-swept hair, dynamic motion blur on limbs, warm sunset rim lighting emphasizing bronzed skin and muscle definition, hyper-realistic athletic sensuality, powerful feminine energy, cinematic sports photography vibe, 8K."
  },
  {
    "id": "🤸‍♀️",
    "text": "Graceful gymnast in split leap pose mid-air, semi-nude with sheer leotard or minimal bodysuit clinging to curves, legs extended wide in perfect splits, arched back sensually, arms elegant overhead, soft studio lighting with volumetric god rays highlighting flexibility and toned physique, expression of focused ecstasy, hyper-detailed skin texture, subtle sweat and muscle tension, erotic athletic artistry, photorealistic gymnastics sensuality, ultra-high resolution."
  },
  {
    "id": "💪",
    "text": "Muscular female bodybuilder in double biceps flex pose, semi-nude oiled skin shining under stage lights, vascular arms peaked, abs ripped and glistening, confident seductive gaze at viewer, dramatic low-key lighting with high contrast shadows accentuating every muscle cut, gym or competition stage background, hyper-realistic body details, pores, veins and natural imperfections, empowering erotic fitness art, powerful sensual strength, 8K masterpiece."
  },
  {
    "id": "🧗‍♀️",
    "text": "Sensual rock climber gripping hold on boulder wall, semi-nude athletic woman in tiny climbing shorts and harness, body stretched taut showing back muscles and glutes, sweat dripping down spine, intense determined expression, outdoor sunset cliff setting with golden light casting long shadows on curves, hyper-detailed skin grip texture, chalk dust and natural contours, erotic adventure athleticism, photorealistic outdoor fitness sensuality."
  },
  {
    "id": "🏊‍♀️",
    "text": "Erotic swimmer emerging from pool in butterfly stroke finish, semi-nude with water droplets cascading over toned body, minimal one-piece swimsuit or bikini clinging wetly, arms extended sensually overhead, arched back and powerful legs, dramatic underwater-to-surface lighting with caustics and blue glow on skin, hyper-realistic water sheen, muscle definition and breath-catching expression, sensual aquatic athletic art, cinematic water sports vibe, 8K."
  },
  {
    "id": "🥊",
    "text": "Fierce female boxer in fighting stance shadowboxing, semi-nude with sports bra and shorts, gloves up, hips twisted sensually in punch motion, sweat flying off skin, defined shoulders and abs glistening, intense predatory gaze, gym ring lighting with spotlights creating dramatic highlights and shadows on curves, hyper-detailed muscle flex, veins and fight-ready energy, erotic combat athleticism, photorealistic powerful sensuality."
  },
  {
    "id": "🫦",
    "text": "Close-up sensual portrait of a woman biting her lower lip seductively, heavy-lidded eyes gazing directly at viewer, glossy parted lips, flushed cheeks, soft bedroom lighting with warm candle glow, subtle shadows accentuating jawline and collarbones, hyper-detailed skin with natural imperfections and faint freckles, intimate boudoir atmosphere, erotic tension, cinematic shallow depth of field, 8K ultra-realistic."
  },  
  {
    "id": "🪞",
    "text": "Mirror reflection erotic self-portrait, beautiful woman admiring her semi-nude body in full-length antique mirror, hand cupping breast, other hand trailing down abdomen, soft vanity lighting with golden hour glow, multiple reflections creating infinite sensuality, confident and aroused expression, detailed skin texture, subtle imperfections, luxurious bedroom setting, voyeuristic yet empowering vibe, photorealistic 8K."
  },
  {
    "id": "🖤",
    "text": "Dominant latex-clad woman in BDSM dungeon, glossy black latex catsuit unzipped to reveal cleavage, holding leather whip or riding crop, stern yet seductive gaze, chains and restraints in background, dramatic red and blue neon lighting, cyber-gothic atmosphere, high-contrast shadows emphasizing curves and latex shine, powerful erotic dominance, ultra-detailed material textures, dark fantasy NSFW."
  },
  {
    "id": "🕉️",
    "text": "Sacred tantric connection in yab-yum seated pose, semi-nude couple facing each other in close embrace, eyes locked in deep soul-gazing, synchronized slow breathing, subtle golden kundalini energy spiraling gently up their spines, soft glowing aura in violet and gold tones, ancient temple setting with incense smoke and candlelight, serene expressions of spiritual intimacy, hyper-detailed skin with natural glow, ethereal volumetric lighting, sacred sexuality in photorealistic style blended with traditional tantric art, peaceful and transcendent mood, 8K ultra-detailed."
  },
  {
    "id": "🔥",
    "text": "Gentle kundalini awakening during tantric meditation, semi-nude woman in graceful meditative pose, soft orange-red energy flowing upward through chakras as warm light, partner lightly touching sacral area with reverence, blissful calm expression, dark temple with flickering candles and mandala patterns on floor, rim lighting highlighting subtle skin sheen and energy glow, mystical and sensual atmosphere, inspired by visionary sacred art, hyper-realistic skin textures and natural imperfections, serene divine energy flow, cinematic depth."
  },
  {
    "id": "❤️",
    "text": "Heart-centered tantric bond, semi-nude couple in skin-to-skin embrace with hands over each other's hearts, glowing emerald light pulsing softly between chests, synchronized deep breathing, relaxed loving expressions, luxurious red silk surroundings, warm candlelight and moonlight creating gentle highlights, intimate spiritual connection, ethereal floating particles, photorealistic with influences from sacred miniature paintings, ultra-detailed skin contact and natural warmth, emotional and devotional mood, 8K resolution."
  },
  {
    "id": "🪷",
    "text": "Reverent tantric ritual of presence and touch, semi-nude figures in meditative closeness, gentle hand placement with sacred intention, adorned with rose petals and subtle oils, soft pink-golden lighting from surrounding candles, calm meditative faces radiating devotion, intricate henna designs on skin, incense curling in air, dreamlike sacred space blending realism and symbolic tantra aesthetics, hyper-detailed textures on skin, petals and fabrics, elevated sensual reverence, no explicit contact, peaceful worshipful atmosphere."
  },
  {
    "id": "💫",
    "text": "Divine tantric harmony, semi-nude couple in slow intimate lotus embrace, bodies aligned in gentle rhythm of breath and energy, cosmic rainbow chakra glow softly surrounding them, starry ethereal background merging with temple elements, third eyes subtly illuminated, expressions of transcendent peace and connection, visionary sacred art style with subtle psychedelic-tantric fusion, ultra-detailed energy lines, skin glow and natural textures, profound spiritual intimacy, 8K masterpiece."
  },
  {
    "id": "🌿",
    "text": "Tantric breathwork in nature, semi-nude couple seated facing each other on forest floor at twilight, palms gently touching, intense yet serene eye contact channeling life force, subtle energy glow between them, fireflies and soft bioluminescent plants around, wind gently moving hair, natural sacred outdoor setting, photorealistic with mystical tantric essence, detailed skin with dew and goosebumps, warm golden hour rim light, mindful sensual presence, intimate spiritual harmony."
  },
  {
    "id": "⚡",
    "text": "Solo tantric energy awakening, semi-nude woman in meditative pose with gentle arch, white-gold kundalini light rising softly from base to crown in graceful flow, body relaxed in divine bliss, eyes softly closed, aura expanding in sacred geometry patterns, dark void with faint mandalas, visionary sacred erotic art style, hyper-detailed skin flush, subtle muscle tone and natural glow, transcendent self-connection and inner ecstasy, ultra-high resolution spiritual art."
  },  
  {
    "id": "🧘‍♀️",
    "text": "Semi-nude woman in graceful Cat-Cow pose flow on soft yoga mat, arched back sensually, head tilted back in gentle ecstasy, minimal sheer fabric draping loosely over curves, warm golden hour sunlight streaming through window creating glowing rim lights on skin, serene bedroom studio with plants and candles, hyper-detailed skin texture with subtle sheen of natural oil, mindful sensual movement, photorealistic with ethereal yoga art vibe, peaceful erotic energy, 8K ultra-detailed."
  },
  {
    "id": "🧘",
    "text": "Elegant semi-nude figure in Downward-Facing Dog pose, hips lifted high, long spine extended sensually, minimal lace shorts or flowing sarong slipping slightly, soft morning light casting long shadows and highlights on toned muscles and curves, minimalist yoga space with wooden floor and incense smoke, calm aroused expression with closed eyes, hyper-realistic skin pores and subtle sweat glow, sensual yoga practice blending strength and surrender, cinematic depth of field."
  },
  {
    "id": "🌙",
    "text": "Semi-nude couple in partnered yoga: supported bridge pose with gentle intimate contact, one partner lying back arched gracefully, the other supporting hips with reverent hands, eyes softly connected in breath synchronization, moonlight filtering through sheer curtains creating blue-silver glow on skin, luxurious dark bedroom with silk pillows, subtle energy flow between bodies, photorealistic sacred erotic yoga, detailed skin textures and natural contours, tranquil yet charged sensual atmosphere, 8K."
  },
  {
    "id": "🪷",
    "text": "Sensual lotus pose meditation, semi-nude woman seated with legs crossed, hands in mudra resting on knees, bare torso with subtle oil sheen catching candlelight, spine tall and chest open invitingly, soft pink and amber lighting from surrounding diyas, peaceful expression of inner bliss and subtle arousal, intricate floral mandala background, hyper-detailed skin glow, goosebumps and natural imperfections, mindful erotic presence in yoga practice, artistic sacred sensuality, ultra-high resolution."
  },
  {
    "id": "🔥",
    "text": "Dynamic erotic yoga flow: semi-nude figure transitioning from Warrior II to Reverse Warrior, strong legs grounded, torso arched back sensually with arm extended overhead, minimal flowing wrap around hips, dramatic side lighting emphasizing muscle definition and soft curves, sunset warm tones through large window, focused yet ecstatic expression, hyper-realistic sweat beads and skin flush, powerful sensual energy awakening through asana, photorealistic yoga art with erotic undertone."
  },
  {
    "id": "💫",
    "text": "Semi-nude solo erotic yoga in Child's Pose variation with hips lifted sensually, arms extended forward, forehead to mat in surrender, sheer silk scarf draped loosely over back, soft diffused light creating gentle highlights on exposed skin, cozy yoga nook with cushions and essential oils, expression of deep release and subtle pleasure, ethereal particles floating softly, hyper-detailed fabric texture against skin, transcendent sensual relaxation, cinematic sacred yoga mood, 8K."
  },
  {
    "id": "🌿",
    "text": "Outdoor tantric-inspired yoga: semi-nude woman in Tree Pose balance, one leg gracefully lifted, hands in prayer at heart center, minimal bikini bottom or sarong, surrounded by lush tropical forest at dawn, soft mist and golden rays piercing leaves highlighting skin and subtle energy glow, serene face with gentle smile of connection, hyper-realistic dew on skin and natural body contours, sensual harmony with nature through yoga practice, peaceful erotic mindfulness, ultra-detailed."
  },
  {
    "id": "🐍",
    "text": "Semi-nude woman in Cobra Pose (Bhujangasana), lying prone with chest lifted sensually, back arched gracefully, head tilted back in gentle ecstasy, minimal sheer wrap or lace draping loosely over hips, soft warm sunlight casting golden highlights on curves and toned back, serene yoga studio with plants and incense, hyper-detailed skin texture with subtle natural sheen, mindful erotic backbend, photorealistic sensual yoga art, peaceful yet charged atmosphere, 8K ultra-detailed."
  },
  {
    "id": "🕊️",
    "text": "Sensual Pigeon Pose (Eka Pada Rajakapotasana), semi-nude figure with one leg extended back, hips sinking deeply into the mat in hip-opening stretch, torso arched forward elegantly, arms extended or resting sensually, minimal flowing sarong slipping slightly, soft diffused morning light emphasizing muscle contours and soft skin glow, minimalist indoor space with wooden floor, calm expression of release and subtle pleasure, hyper-realistic skin details and natural contours, erotic yoga hip opener, cinematic depth of field."
  },
  {
    "id": "🦋",
    "text": "Erotic Butterfly Pose (Baddha Konasana variation), semi-nude woman seated with soles of feet together, knees dropped open sensually, hands resting on thighs or gently pressing knees down, bare torso with subtle oil catching candlelight, spine tall and chest open invitingly, warm amber lighting from surrounding candles, serene blissful face with closed eyes, intricate subtle patterns on skin, hyper-detailed skin flush and goosebumps, mindful sensual hip opening in yoga, artistic sacred erotic vibe, 8K resolution."
  },
  {
    "id": "🌿",
    "text": "Graceful Happy Baby Pose (Ananda Balasana), semi-nude figure lying on back holding feet with hands, knees drawn toward floor sensually, hips open wide, minimal sheer fabric draped over abdomen, soft natural light from window creating gentle rim lights on inner thighs and curves, cozy yoga mat setup with cushions, expression of deep surrender and subtle arousal, hyper-realistic skin texture, natural body folds and glow, playful yet erotic yoga relaxation pose, photorealistic intimate art."
  },
  {
    "id": "🌀",
    "text": "Dynamic Bridge Pose (Setu Bandhasana) flow, semi-nude woman lifting hips high in sensual arch, shoulders grounded, chest thrusting upward invitingly, minimal lace shorts or flowing wrap, dramatic side lighting from sunset highlighting muscle tension and soft skin sheen, outdoor terrace or studio with plants, focused ecstatic expression with parted lips, hyper-detailed sweat beads and energy flow, powerful erotic yoga backbend, ultra-detailed sensual strength and vulnerability."
  },
  {
    "id": "🌹",
    "text": "Partnered erotic yoga in Supported Fish Pose, semi-nude woman reclining back over partner's thighs or bolster, chest lifted sensually, arms draped open, gentle intimate support from partner, moonlight or candlelight creating silver-gold glow on exposed skin, luxurious dark setting with silk elements, synchronized breathing visible in subtle chest rise, photorealistic sacred connection through asana, detailed skin contact and natural warmth, tranquil sensual tantric-yoga mood, 8K masterpiece."
  },
  {
    "id": "🌸",
    "text": "Sensual Forward Fold variation (Uttanasana with twist), semi-nude figure bending deeply forward from standing, one hand reaching toward floor sensually, other arm extended upward in twist, minimal sarong or sheer top slipping off shoulders, soft golden hour light piercing through leaves if outdoor, or studio window, expression of deep release and inner bliss, hyper-realistic muscle elongation, skin texture and subtle flush, erotic yoga stretch blending grounding and opening, peaceful charged atmosphere."
  },
  {
    "id": "🔗",
    "text": "Elegant woman in delicate Shibari rope bondage, intricate red silk ropes artistically wrapped around curves and breasts, suspended gently or kneeling submissively, serene yet aroused expression, soft diffused studio lighting with rim lights highlighting skin texture and rope shadows, minimalist dark background, erotic Japanese kinbaku aesthetic, highly detailed rope patterns and subtle muscle tension, sensual vulnerability, photorealistic 8K."
  },
  {
    "id": "🕯️",
    "text": "Semi-nude figure reclining on luxurious velvet sheets in candlelit room, dramatic chiaroscuro lighting from multiple candles casting long shadows and golden highlights on oiled skin, arched back and parted lips in ecstasy, hands trailing sensually over body, classical oil painting vibe mixed with modern hyper-realism, inspired by Caravaggio and Helmut Newton, ultra-detailed skin pores, sweat beads and fabric texture, moody erotic masterpiece."
  },
  {
    "id": "🌹",
    "text": "Sensual woman lying amid a bed of red rose petals, nude body partially covered by scattered flowers, soft morning light filtering through sheer curtains, gentle curves glistening with morning dew-like oil, relaxed yet inviting pose with one hand between thighs, romantic and erotic boudoir photography style, warm pastel tones, hyper-realistic skin details, floral fragrance implied, intimate and passionate mood."
  },    
  {
    "id": "👩‍❤️‍💋‍👨",
    "text": "Romantic passionate man and woman couple in close embrace, man gently holding woman's face for a deep sensual kiss, semi-nude bodies pressed together with subtle skin glow, soft candlelight casting warm golden highlights on curves and shoulders, eyes half-closed in desire, luxurious bedroom with silk sheets in background, hyper-detailed skin texture, natural warmth and subtle sweat sheen, intimate loving connection, photorealistic cinematic romance, tender yet intense mood, 8K ultra-detailed."
  },
  {
    "id": "👩‍❤️‍👨",
    "text": "Sensual man and woman in slow dance embrace turning into passionate kiss, semi-nude torsos touching, his hands on her lower back pulling her closer, her fingers in his hair, moonlight through window creating silver rim lights on skin, elegant dimly lit room with soft shadows, expressions of deep affection and arousal, hyper-realistic muscle contours, natural body heat and gentle caresses, romantic erotic couple moment, artistic intimate photography style, 8K resolution."
  },
  {
    "id": "👫",
    "text": "Man and woman couple in tender forehead-to-forehead moment, semi-nude lying face-to-face on bed, hands intertwined, soft breathing synchronized, warm golden hour light filtering through curtains highlighting gentle smiles and flushed skin, intimate eye contact full of love and desire, luxurious white sheets draped loosely, hyper-detailed pores, subtle freckles and natural imperfections, peaceful passionate romance, photorealistic sensual tenderness, cinematic depth of field."
  },
  {
    "id": "👩‍❤️‍👩",
    "text": "Passionate lesbian couple in deep open-mouth kiss, semi-nude bodies entwined on velvet chaise, hands caressing necks and backs tenderly, soft candlelight with warm amber glow accentuating curves and skin sheen, expressions of intense longing and bliss, luxurious intimate setting with rose petals scattered, hyper-detailed lip contact, natural flush and subtle arousal, romantic sensual women connection, photorealistic erotic art, loving and charged atmosphere, 8K masterpiece."
  },
  {
    "id": "👭",
    "text": "Two women in sensual embrace from behind, one gently kissing the other's neck, semi-nude with sheer fabric slipping off shoulders, hands exploring waist and hips softly, twilight blue-purple lighting creating ethereal highlights on skin, serene bedroom with sheer curtains billowing, expressions of quiet ecstasy and trust, hyper-realistic skin texture, goosebumps and gentle touch details, intimate lesbian romance, artistic passionate tenderness, ultra-high resolution."
  },
  {
    "id": "💞",
    "text": "Lesbian couple in moonlit outdoor embrace, semi-nude sitting close on blanket, one woman's head on the other's shoulder, soft kisses along jawline, starlit night sky with gentle silver moonlight illuminating bodies and subtle glow, natural forest or beach background, synchronized breathing and loving gazes, hyper-detailed skin under natural light, dew-like sheen and emotional depth, romantic sensual women in nature, photorealistic dreamy intimacy, cinematic mood."
  },
  {
    "id": "🫂",
    "text": "Mixed couple and lesbian variation blend: passionate embrace transitioning to kiss, semi-nude figures in skin-to-skin contact, hands cradling faces tenderly, warm firelight or sunset glow casting golden-orange rim lights on intertwined bodies, cozy fireside or balcony setting, expressions of profound love and desire, hyper-detailed natural contours, subtle muscle tension and warmth, romantic sensual connection regardless of gender, artistic erotic romance, 8K ultra-detailed."
  }

];


  /* see above for FIXED_PROMPTS extras  ,
  
  {    
    "id": "💞",
    "text": "Two women in passionate embrace, one woman's hands gently cupping the other's face, both looking into each other's eyes with deep affection and desire, soft candlelight casting warm shadows on skin, intimate bedroom setting with rose petals scattered, expressions of tender love and longing, hyper-detailed facial features and skin texture, subtle blush and natural body heat, romantic sensual connection between women, photorealistic emotional intimacy."
  },
  {
    "id": "🔥",
    "text": "Passionate lesbian couple in heated embrace, deep open-mouth kiss, hands exploring each other's bodies, tangled in silk sheets on a luxurious bed, low warm lighting with red accents, sweat-glistened skin, intense eye contact breaking for kiss, erotic tension and desire, cinematic composition, ultra-detailed lips, tongues and skin contact, raw sensual energy, NSFW high-impact glamour photography."
  },
  {
    "id": "🌙",
    "text": "Moonlit semi-nude silhouette on balcony overlooking city nightscape, woman arching back against railing, wind-swept hair, full moon casting ethereal blue glow on skin, subtle highlights on breasts and hips, mysterious and erotic nocturnal mood, long exposure star trails in sky, cinematic wide angle, hyper-detailed skin and atmospheric haze, sensual midnight fantasy."
  },
  {
    "id": "🛏️",
    "text": "Post-coital afterglow scene, disheveled woman in tangled white sheets, flushed skin with love bites and hickeys, satisfied smirk, hair messy across pillow, soft morning light through blinds creating striped shadows on body, intimate bedroom realism, hyper-detailed skin marks, sweat and natural body fluids sheen, erotic realism like high-end adult photography, relaxed sensual vulnerability."
  },
  {
    "id": "💋",
    "text": "Erotic underwater embrace, two nude bodies entwined in crystal-clear turquoise water, bubbles rising sensually, hair floating like silk, hands caressing wet skin, shafts of sunlight piercing surface creating god rays on curves, dreamlike aquatic fantasy, slow-motion fluidity, ultra-detailed water caustics and skin underwater texture, sensual mermaid-like allure, NSFW artistic nude."
  },
  
  */



(() => {
  const STORAGE_KEY = "grok_imagine_prompts";
  const MODE_KEY = "grok_prompt_insert_mode";
  const VIDEO_CTRL_KEY = "grok_video_controls_enabled";

  let prompts = [];
  let currentZoom = 1;
  let currentWidth = 1;
  let ORIG_WIDTH = 1;
  let ORIG_HEIGHT = 1;
  let ultimaUrl = location.href;

  const getMode = () => localStorage.getItem(MODE_KEY) || "replace";
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      prompts = Array.isArray(saved) && saved.length > 0 ? saved : [...DEFAULT_PROMPTS];
      if (!saved) save();
    } catch {
      prompts = [...DEFAULT_PROMPTS];
      save();
    }
  };

  const findImagineInput = () => document.querySelector("textarea, input[type='text']");

  const insertTextToInput = (text) => {
    const input = findImagineInput();
    if (input) {
      const mode = getMode();
      input.value = mode === "replace" ? text : (input.value ? input.value + "\n" + text : text);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  function exportJSON() {
    const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "grok-prompts.json";
    a.click();
  }

  function importJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      file.text().then((text) => {
        try {
          prompts = JSON.parse(text);
          save();
          updatePromptCount();
          const list = document.querySelector(".prompt-list");
          if (list) render(list);
        } catch { alert("Invalid JSON"); }
      });
    };
    input.click();
  }

  function createManager() {
    const hr = document.querySelector("#imagine-post-page-content");
    if (!hr || document.querySelector("#grok-prompt-manager")) return;

    const root = document.createElement("div");
    root.id = "grok-prompt-manager";

    const toolbar = document.createElement("div");
    toolbar.className = "prompt-toolbar";

    const toggleBtn = createBtn("▼", () => {
      const list = document.querySelector(".prompt-list");
      if (list) {
        const isCollapsed = list.classList.toggle("collapsed");
        toggleBtn.textContent = isCollapsed ? "▼" : "▲";
      }
    }, "Expand/Collapse Prompts");
    toggleBtn.className = "toggle-list-btn";

    const addBtn = createBtn(`+ Prompts (${prompts.length})`, () => openModal(), "Add Prompt");
    addBtn.id = "main-add-btn";

    const expBtn = createBtn("📥", exportJSON, "Export Prompts");
    const impBtn = createBtn("📤", importJSON, "Import Prompts");

    const modeBtn = createBtn(`⇄ ${getMode()}`, () => {
      const next = getMode() === "Append" ? "Replace" : "Append";
      localStorage.setItem(MODE_KEY, next);
      modeBtn.textContent = `⇄ ${next}`;
    }, "Toggle Insert Mode");

    const videoBtn = createBtn("🎬 Controls", () => {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        chrome.storage.local.set({ [VIDEO_CTRL_KEY]: !res[VIDEO_CTRL_KEY] }, applyVideoSettings);
      });
    }, "Toggle Video Controls");

    const fsBtn = createBtn("🖵", toggleFullScreen, "Fullscreen");
    const wControl = createStepper("w-display", `W:${currentWidth}px`, () => updateWidth(currentWidth - 50), () => updateWidth(currentWidth + 50));
    const zoomOutBtn = createBtn("🔍-", () => applyZoom(currentZoom - 0.1), "Diminuir Zoom");
    const zoomInBtn = createBtn("🔍+", () => applyZoom(currentZoom + 0.1), "Aumentar Zoom");
    const resetBtn = createBtn("🔄", resetToDefault, "Reset");
    const cleanBtn = createBtn("🧹", () => {
      const input = findImagineInput();
      if (input) {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, "Limpar Input");

    toolbar.append(addBtn, modeBtn, videoBtn, fsBtn, wControl, zoomOutBtn, zoomInBtn, resetBtn, cleanBtn, expBtn, impBtn, toggleBtn);

    const fixedBar = document.createElement("div");
    fixedBar.className = "fixed-prompts-bar";
    fixedBar.style.cssText = "display:flex; flex-wrap:wrap; gap:4px; padding:5px; border-bottom:1px solid var(--border); background:rgba(0,0,0,0.05);";
    
    FIXED_PROMPTS.forEach(p => {
      const btn = createBtn(p.id, () => insertTextToInput(p.text), p.text);
      btn.style.fontSize = "16px";
      btn.style.padding = "4px 8px";
      fixedBar.appendChild(btn);
    });

    const list = document.createElement("div");
    list.className = "prompt-list collapsed";

    root.append(toolbar, fixedBar, list);
    hr.insertAdjacentElement("afterend", root);
    render(list);
  }

  function openModal(existingPrompt = null) {
    const isEditing = existingPrompt && typeof existingPrompt.text === 'string';
    const backdrop = document.createElement("div");
    backdrop.className = "grok-modal-backdrop";
    backdrop.innerHTML = `
      <div class="grok-modal">
        <h3>${isEditing ? "Edit Prompt" : "Add Prompt"}</h3>
        <textarea style="width:100%; height:100px; background:#222; color:white; border:1px solid #444; padding:8px; border-radius:8px;">${isEditing ? existingPrompt.text : ""}</textarea>
        <div style="display:flex; justify-content:flex-end; gap:5px; margin-top:10px">
          <button id="close-modal">Cancel</button>
          <button id="save-modal" style="background:#4da3ff; color:white">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    const textarea = backdrop.querySelector("textarea");
    textarea.focus();

    backdrop.querySelector("#close-modal").onclick = () => backdrop.remove();
    backdrop.querySelector("#save-modal").onclick = () => {
      document.querySelector(".prompt-list").classList.remove("collapsed"); // Expand list on save
      const val = textarea.value.trim();
      if (val) {
        if (isEditing) {
          const index = prompts.findIndex(x => x.id === existingPrompt.id);
          if (index !== -1) prompts[index].text = val;
        } else {
          prompts.push({ id: Math.random().toString(36).slice(2), text: val });
        }
        save();
        updatePromptCount();
        const listElement = document.querySelector(".prompt-list");
        if (listElement) render(listElement);
      }
      backdrop.remove();
    };
  }

  function render(list) {
    list.innerHTML = "";
    prompts.forEach((p) => {
      const item = document.createElement("div");
      item.className = "prompt-item";
      item.innerHTML = `<span class="prompt-text" title="${p.text}">${p.text.length > 20 ? p.text.slice(0, 20) + "..." : p.text}</span>`;
      const edit = document.createElement("span");
      edit.className = "prompt-edit";
      edit.textContent = "✏️";
      edit.onclick = (e) => { e.stopPropagation(); openModal(p); };
      const del = document.createElement("span");
      del.className = "prompt-delete";
      del.textContent = "❌";
      del.onclick = (e) => {
        e.stopPropagation();
        if (confirm("Delete?")) {
          prompts = prompts.filter((x) => x.id !== p.id);
          save();
          updatePromptCount();
          render(list);
        }
      };
      item.onclick = () => insertTextToInput(p.text);
      item.append(edit, del);
      list.appendChild(item);
    });
  }

  function createBtn(text, onclick, title = "") {
    const b = document.createElement("button");
    b.textContent = text;
    b.onclick = onclick;
    b.title = title;
    return b;
  }

  function createStepper(id, initial, onMinus, onPlus) {
    const div = document.createElement("div");
    div.style.cssText = "display:flex; align-items:center; gap:2px; background:#333; padding:2px 4px; border-radius:5px;";
    const minus = createBtn("➖", onMinus, "To decrease");
    const display = document.createElement("span");
    display.id = id;
    display.style.cssText = "font-size:10px; min-width:42px; text-align:center; color:white;";
    display.textContent = initial;
    const plus = createBtn("➕", onPlus, "Increase");
    div.append(minus, display, plus);
    return div;
  }

  function applyVideoSettings() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get([VIDEO_CTRL_KEY], (res) => {
        const enabled = !!res[VIDEO_CTRL_KEY];
        document.querySelectorAll("video").forEach((v) => {
          const container = v.closest(".group.relative.mx-auto");
          if (enabled) {
            v.setAttribute("controls", "true");
            v.style.pointerEvents = "auto";
            if (container) {
              container.querySelectorAll("div.absolute").forEach((d) => {
                if (!d.querySelector('button[aria-label="Mais opções"]')) {
                  d.style.setProperty("display", "none", "important");
                }
              });
            }
          } else {
            v.removeAttribute("controls");
            if (container)
              container
                .querySelectorAll("div.absolute")
                .forEach((d) => (d.style.display = ""));
          }
        });
      });
    }
  }

  // Ativa controles em todos os vídeos em Favoreite
  function controlsAllVideos() {
    const urlAtual = window.location.href;

    if (urlAtual === "https://grok.com/imagine/favorites") {
      document.querySelectorAll("video").forEach((v) => {
        v.setAttribute("controls", "true");
        v.style.pointerEvents = "auto";
        v.style.objectFit = "contain";
      });
    }
  }

  function toggleFullScreen() {
  const video = document.querySelector('video[style*="visible"]');
  if (video) {
    // Garante que o vídeo se ajuste à tela sem cortes antes de entrar em fullscreen
    video.style.objectFit = "contain";
    
    // Tenta abrir em tela cheia
    const promise = video.requestFullscreen?.() || video.webkitRequestFullscreen?.();
    
    // Opcional: Monitora a saída do fullscreen para restaurar o comportamento padrão da UI
    video.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        video.style.objectFit = ""; // Restaura o CSS original ao sair
      }
    };
  }
}

  function updateWidth(widthPx) {
    currentWidth = parseInt(widthPx);
    const container = document.querySelector("div.group.relative.mx-auto.rounded-2xl.overflow-hidden");
    const display = document.querySelector("#w-display");
    if (ORIG_WIDTH <= 1 && container) {
      ORIG_WIDTH = container.clientWidth;
      ORIG_HEIGHT = container.clientHeight;
    }
    if (display) display.textContent = `${currentWidth}px`;
    if (container) {
      container.style.width = `${currentWidth}px`;
      container.style.height = `${Math.round(currentWidth * (ORIG_HEIGHT / ORIG_WIDTH))}px`;
    }
  }

  function applyZoom(val) {
    currentZoom = Math.max(0.5, Math.min(5, val));
    const media = document.querySelector('video[style*="visible"], img.object-cover:not(.invisible)');
    if (media) media.style.transform = `scale(${currentZoom})`;
  }

  function resetToDefault() {
    applyZoom(1);
    if (ORIG_WIDTH > 1) updateWidth(ORIG_WIDTH);
  }

  function updatePromptCount() {
    const btn = document.querySelector("#main-add-btn");
    if (btn) btn.textContent = `+ Prompts (${prompts.length})`;
  }

  load();
  setInterval(() => {
    if (location.href.includes("/imagine/post")) {
      createManager();
      const container = document.querySelector("div.group.relative.mx-auto.rounded-2xl.overflow-hidden");
      const display = document.querySelector("#w-display");
      if (ORIG_WIDTH <= 1 && container) {
        ORIG_WIDTH = container.clientWidth;
        ORIG_HEIGHT = container.clientHeight;
        currentWidth = ORIG_WIDTH;
        if (display) display.textContent = `${currentWidth}px`;
      }
    } else {
      ORIG_WIDTH = 1;
      controlsAllVideos();  
    }
  }, 2000);
  const observer = new MutationObserver(() => {
    controlsAllVideos();    
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();