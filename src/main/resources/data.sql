DELETE FROM review;
ALTER TABLE review ALTER COLUMN id RESTART WITH 1;
DELETE FROM ANSWER_HISTORY;
ALTER TABLE ANSWER_HISTORY ALTER COLUMN id RESTART WITH 1;
DELETE FROM answers;
ALTER TABLE answers ALTER COLUMN id RESTART WITH 1;
DELETE FROM question;
ALTER TABLE question ALTER COLUMN id RESTART WITH 1;
DELETE FROM quiz;
ALTER TABLE quiz ALTER COLUMN id RESTART WITH 1;
DELETE FROM category;
ALTER TABLE category ALTER COLUMN id RESTART WITH 1;


-- Insert category
INSERT INTO category (name, description) VALUES
('Programming Languages', 'Learn different programming languages'),
('World History', 'Explore historical events and figures'),
('Finnish Language', 'Learn Finnish vocabulary and grammar');

-- Insert quizzes


INSERT INTO quiz (title, description, status, category_id, created_date) VALUES
('Java Basics', 'Fundamental Java concepts', 'Published', 1, CURRENT_TIMESTAMP()),
('Python Essentials', 'Core Python programming', 'Published', 1, CURRENT_TIMESTAMP()),
('Ancient Civilizations', 'Early history of human civilizations', 'Published', 2, CURRENT_TIMESTAMP()),
('World Wars', 'Major global conflicts and their impact', 'Published', 2, CURRENT_TIMESTAMP()),
('Basic Vocabulary', 'Essential Finnish words for beginners', 'Published', 3, CURRENT_TIMESTAMP()),
('Numbers & Colors', 'Learn numbers and colors in Finnish', 'Published', 3, CURRENT_TIMESTAMP()),
('Common Phrases', 'Everyday Finnish expressions', 'Published', 3, CURRENT_TIMESTAMP()),
('Basic Grammar', 'Finnish grammar fundamentals', 'Published', 3, CURRENT_TIMESTAMP());

-- Insert questions
INSERT INTO question (q_description, difficulty, quiz_id) VALUES
-- Java Questions (Quiz 1)
('What is Java?', 'easy', 1),
('Which keyword is used for inheritance in Java?', 'medium', 1),
('What is the main method signature in Java?', 'medium', 1),
('What is a constructor in Java?', 'medium', 1),
('What is an interface in Java?', 'medium', 1),

-- Python Questions (Quiz 2)
('What is Python?', 'easy', 2),
('What is PIP in Python?', 'medium', 2),
('What is a list comprehension?', 'medium', 2),
('What is the difference between tuples and lists?', 'medium', 2),
('What is the GIL in Python?', 'hard', 2),

-- Ancient Civilizations Questions (Quiz 3)
('Which civilization built the pyramids?', 'easy', 3),
('What was the capital of the Roman Empire?', 'medium', 3),
('Who was the first Emperor of China?', 'medium', 3),
('What was the significance of the Nile River?', 'medium', 3),
('Who wrote the Art of War?', 'medium', 3),

-- World Wars Questions (Quiz 4)
('When did World War I begin?', 'easy', 4),
('What was the immediate cause of World War I?', 'medium', 4),
('Who were the Axis powers in World War II?', 'medium', 4),
('What was the D-Day invasion?', 'medium', 4),
('What was the Manhattan Project?', 'hard', 4),

-- Basic Vocabulary
('What does "kiitos" mean?', 'easy', 5),
('What is "terve" in English?', 'easy', 5),
('What does "hyvää päivää" mean?', 'easy', 5),
('What is "anteeksi" in English?', 'easy', 5),
('What does "näkemiin" mean?', 'easy', 5),

-- Numbers & Colors
('What is "yksi" in English?', 'easy', 6),
('What color is "sininen"?', 'easy', 6),
('What is "kolme" in English?', 'easy', 6),
('What color is "punainen"?', 'easy', 6),
('What is "viisi" in English?', 'easy', 6),

-- Common Phrases
('What does "Mitä kuuluu?" mean?', 'medium', 7),
('What is "Ole hyvä" in English?', 'medium', 7),
('How do you say "I don''t understand" in Finnish?', 'medium', 7),
('What does "Hauska tavata" mean?', 'medium', 7),
('What is "Hyvää ruokahalua" in English?', 'medium', 7),

-- Basic Grammar
('What is the Finnish word for "I"?', 'medium', 8),
('What is the partitive case ending?', 'hard', 8),
('Which case is used for "in/on/at"?', 'hard', 8),
('What is the plural marker in Finnish?', 'medium', 8),
('How do you form negative sentences?', 'hard', 8);

INSERT INTO answers (option, is_correct, question_id) VALUES
-- Java Question 1 answers
('A high-level programming language', true, 1),
('A type of coffee', false, 1),
('An operating system', false, 1),
('A database management system', false, 1),

-- Java Question 2 answers
('extends', true, 2),
('inherits', false, 2),
('implements', false, 2),
('super', false, 2),

-- Java Question 3 answers
('public static void main(String[] args)', true, 3),
('void main(String[] args)', false, 3),
('public void main()', false, 3),
('static void main()', false, 3),

-- Java Question 4 answers
('A special method that initializes objects', true, 4),
('A method to destroy objects', false, 4),
('A method to compare objects', false, 4),
('A method to convert objects', false, 4),

-- Java Question 5 answers
('A contract that defines behavior', true, 5),
('A class that contains only methods', false, 5),
('A type of inheritance', false, 5),
('A way to create objects', false, 5),

-- Python Question 1 answers
('High-level interpreted language', true, 6),
('Database system', false, 6),
('Web browser', false, 6),
('Operating system', false, 6),

-- Python Question 2 answers
('Package installer for Python', true, 7),
('Python compiler', false, 7),
('Performance tool', false, 7),
('Testing framework', false, 7),

-- Python Question 3 answers
('Concise way to create lists', true, 8),
('Type of loop', false, 8),
('Error handling method', false, 8),
('Import statement', false, 8),

-- Python Question 4 answers
('Tuples are immutable', true, 9),
('Lists are faster', false, 9),
('Tuples use less memory', false, 9),
('No difference', false, 9),

-- Python Question 5 answers
('Global Interpreter Lock', true, 10),
('General Input Loop', false, 10),
('Global Instance Link', false, 10),
('Generator Input List', false, 10),

-- Ancient Civilizations Question 1 answers
('Ancient Egyptians', true, 11),
('Romans', false, 11),
('Greeks', false, 11),
('Persians', false, 11),

-- Ancient Civilizations Question 2 answers
('Rome', true, 12),
('Athens', false, 12),
('Constantinople', false, 12),
('Alexandria', false, 12),

-- Ancient Civilizations Question 3 answers
('Qin Shi Huang', true, 13),
('Sun Tzu', false, 13),
('Confucius', false, 13),
('Han Wu Di', false, 13),

-- Ancient Civilizations Question 4 answers
('Agriculture and transportation', true, 14),
('Only religious purposes', false, 14),
('Military defense', false, 14),
('Trade route', false, 14),

-- Ancient Civilizations Question 5 answers
('Sun Tzu', true, 15),
('Confucius', false, 15),
('Lao Tzu', false, 15),
('Emperor Wu', false, 15),

-- World Wars Question 1 answers
('1914', true, 16),
('1918', false, 16),
('1939', false, 16),
('1945', false, 16),

-- World Wars Question 2 answers
('Assassination of Archduke Franz Ferdinand', true, 17),
('Economic crisis', false, 17),
('Colonial expansion', false, 17),
('Arms race', false, 17),

-- World Wars Question 3 answers
('Germany, Italy, Japan', true, 18),
('Britain, France, Russia', false, 18),
('USA, Britain, France', false, 18),
('Russia, China, Japan', false, 18),

-- World Wars Question 4 answers
('Allied invasion of Normandy', true, 19),
('Battle of Britain', false, 19),
('Pacific campaign', false, 19),
('Russian front', false, 19),

-- World Wars Question 5 answers
('Atomic bomb development', true, 20),
('Tank development', false, 20),
('Code breaking project', false, 20),
('Radar development', false, 20),

-- Basic Vocabulary answers
('Thank you', true, 21),
('Hello', false, 21),
('Goodbye', false, 21),
('Please', false, 21),

('Hello', true, 22),
('Goodbye', false, 22),
('Thanks', false, 22),
('Welcome', false, 22),

('Good day', true, 23),
('Good night', false, 23),
('Good morning', false, 23),
('Good evening', false, 23),

('Excuse me/Sorry', true, 24),
('Please', false, 24),
('Thank you', false, 24),
('Welcome', false, 24),

('Goodbye', true, 25),
('Hello', false, 25),
('Thank you', false, 25),
('Please', false, 25),

-- Numbers & Colors answers
('One', true, 26),
('Two', false, 26),
('Three', false, 26),
('Four', false, 26),

('Blue', true, 27),
('Red', false, 27),
('Green', false, 27),
('Yellow', false, 27),

('Three', true, 28),
('One', false, 28),
('Two', false, 28),
('Four', false, 28),

('Red', true, 29),
('Blue', false, 29),
('Green', false, 29),
('Yellow', false, 29),

('Five', true, 30),
('Three', false, 30),
('Four', false, 30),
('Six', false, 30),

-- Common Phrases answers
('How are you?', true, 31),
('What is your name?', false, 31),
('Where are you from?', false, 31),
('How old are you?', false, 31),

('You''re welcome', true, 32),
('Please', false, 32),
('Thank you', false, 32),
('Goodbye', false, 32),

('En ymmärrä', true, 33),
('En tiedä', false, 33),
('En puhu suomea', false, 33),
('En halua', false, 33),

('Nice to meet you', true, 34),
('Good morning', false, 34),
('Thank you', false, 34),
('Goodbye', false, 34),

('Enjoy your meal', true, 35),
('Have a nice day', false, 35),
('Thank you', false, 35),
('You''re welcome', false, 35),

-- Basic Grammar answers
('Minä', true, 36),
('Sinä', false, 36),
('Hän', false, 36),
('Me', false, 36),

('-a/-ä', true, 37),
('-ssa/-ssä', false, 37),
('-lla/-llä', false, 37),
('-sta/-stä', false, 37),

('Inessive (-ssa/-ssä)', true, 38),
('Adessive (-lla/-llä)', false, 38),
('Elative (-sta/-stä)', false, 38),
('Illative (-Vn)', false, 38),

('-t', true, 39),
('-a', false, 39),
('-i', false, 39),
('-n', false, 39),

('Using "ei" + verb stem', true, 40),
('Adding "not" before verb', false, 40),
('Using past participle', false, 40),
('Adding "-ton/-tön"', false, 40);

INSERT INTO review (created_date, comment, rating, student_name, quiz_id) VALUES 
-- Reviews for Java Basics (quiz_id = 1)
(CURRENT_TIMESTAMP(), 'Great introduction to Java! Helped me understand the basics.', 5, 'coder123', 1),
(CURRENT_TIMESTAMP(), 'Clear explanations, but could use more examples.', 4, 'dev_guru', 1),
(CURRENT_TIMESTAMP(), 'Too basic for those with prior programming experience.', 3, 'java_ninja', 1),
-- Reviews for Python Essentials (quiz_id = 2)
(CURRENT_TIMESTAMP(), 'Well-made quiz, but a bit dry at times.', 4, 'python_enthusiast', 2),
-- Reviews for Ancient Civilizations (quiz_id = 3)
(CURRENT_TIMESTAMP(), 'A fascinating dive into history, highly recommend!', 5, 'history_buff', 3),
(CURRENT_TIMESTAMP(), 'Interesting topics, but needs more real-world examples.', 4, 'study_hard', 3),
(CURRENT_TIMESTAMP(), 'The content was good, but the questions were a bit repetitive.', 3, 'history_lover', 3),
-- Reviews for World Wars (quiz_id = 4)
(CURRENT_TIMESTAMP(), 'Engaging content and great examples, learned a lot.', 5, 'global_thinker', 4),
(CURRENT_TIMESTAMP(), 'A good overview, but could have gone deeper into specific battles.', 4, 'war_buff', 4),
(CURRENT_TIMESTAMP(), 'Some of the content was too basic, not enough in-depth analysis.', 3, 'history_explorer', 4),
(CURRENT_TIMESTAMP(), 'Too basic for me', 1, 'history_lover', 4);
