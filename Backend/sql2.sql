-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2022 at 02:26 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `field` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `lesson` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `time_start` varchar(256) NOT NULL,
  `time_end` varchar(256) NOT NULL,
  `date` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `exam_id`, `class`, `field`, `grade`, `lesson`, `description`, `time_start`, `time_end`, `date`) VALUES
(1, 1, 101, 1, 10, 'ریاضی', 'آزمون به صورت تشریحی میباشد', '12:00', '13:30', '2022-03-13'),
(2, 2, 101, 1, 10, 'هندسه', 'آزمون سخت و طولانی است پس دقت کنید !!!', '10:22', '12:22', '2022-03-13'),
(3, 3, 101, 1, 10, 'مثلثات', 'گاز ورمه ، گاز ورمهه', '7:55', '9:30', '2022-3-13'),
(4, 4, 101, 1, 10, 'ادبیات فارسی', 'فقط جواب آخر ارسال شود دوست من', '7:55', '9:30', '2022-3-13'),
(5, 5, 101, 1, 10, 'دینی', 'بسم الله رحمان رحیم', '7:55', '9:30', '2022-3-13'),
(6, 6, 101, 1, 10, 'زبان انگلیسی سطح(D)', 'Best Wishes', '7:55', '9:30', '2022-3-13'),
(7, 7, 101, 1, 10, 'شیمی', 'وقت کمه دقت کنید !!', '7:55', '9:30', '2022-3-13');

-- --------------------------------------------------------

--
-- Table structure for table `exam_result`
--

CREATE TABLE `exam_result` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `result` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exam_result`
--

INSERT INTO `exam_result` (`id`, `user_id`, `exam_id`, `result`, `time`) VALUES
(1, 1, 1, 59, '2022-03-03 15:33:51'),
(2, 1, 3, 23, '2022-03-04 15:44:19'),
(3, 1, 3, 100, '2022-03-05 16:02:34'),
(4, 10, 1, 22, '2022-03-06 16:06:44'),
(5, 10, 2, 44, '2022-03-03 16:06:56'),
(6, 1, 4, 16, '2022-03-06 16:07:52'),
(7, 1, 5, 86, '2022-03-06 16:46:35'),
(8, 1, 6, 23, '2022-03-16 17:25:27'),
(9, 10, 8, 16, '2022-03-06 20:13:15'),
(10, 10, 23, 65, '2022-03-07 07:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `extra_infos`
--

CREATE TABLE `extra_infos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade` int(11) DEFAULT 0,
  `class` int(11) NOT NULL DEFAULT 0,
  `field` int(11) NOT NULL DEFAULT 0,
  `groups` varchar(256) NOT NULL DEFAULT '0',
  `must_study` varchar(256) NOT NULL,
  `changeable` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `homework`
--

CREATE TABLE `homework` (
  `id` int(11) NOT NULL,
  `homework_id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `field` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `lesson` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `extra_file` varchar(256) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `homework`
--

INSERT INTO `homework` (`id`, `homework_id`, `class`, `field`, `grade`, `title`, `lesson`, `description`, `extra_file`, `time`) VALUES
(1, 1, 101, 1, 10, 'تکالیف موازنه', 'شیمی', 'تکالیف تستی است ولی به صورت تشریحی و کامل حل شود', 'T-21.pdf', '2022-03-11 23:46:52'),
(2, 2, 101, 1, 10, 'مثلثات و دنباله های هندسی', 'ریاضی', 'نیاز به تحویل نیست ', 'T-21.pdf', '2022-03-11 23:46:52'),
(3, 3, 101, 1, 10, 'کار انرژی و توان', 'فیزیک', 'تشریحی کامل نمره از 20', 'T-21.pdf', '2022-03-11 23:46:52'),
(4, 4, 101, 1, 10, 'ترسیم 5', 'هندسه', 'کامل خوانا و تمیز', 'T-21.pdf', '2022-03-11 23:46:52'),
(5, 5, 101, 1, 10, 'کارگاه متن پژوهی درس 8', 'ادبیات فارسی', 'تکالیف در کتاب حل شود', 'T-21.pdf', '2022-03-11 23:46:52'),
(6, 6, 101, 1, 10, 'مقاله دانش آموزی', 'دینی', 'مقاله ای درباره ی پیدایش هستی و اعتقاد به آخرت', NULL, '2022-03-11 12:28:06'),
(7, 7, 103, 1, 10, 'تابع و دنباله هندسی', 'ریاضی', 'دقیت کنید فایل به صورت pdf باشد در غیر این صورت برسی نمیشود ', NULL, '2022-03-11 12:36:07');

-- --------------------------------------------------------

--
-- Table structure for table `homework_status`
--

CREATE TABLE `homework_status` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `homework_id` varchar(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `homework_status`
--

INSERT INTO `homework_status` (`id`, `user_id`, `homework_id`, `status`) VALUES
(7, 1, '1', 1),
(9, 1, '3', 0),
(10, 1, '4', 1),
(11, 1, '5', 1),
(15, 2, '7', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pattern`
--

CREATE TABLE `pattern` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(256) NOT NULL,
  `lesson` varchar(256) NOT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pattern`
--

INSERT INTO `pattern` (`id`, `user_id`, `time`, `lesson`, `days`) VALUES
(1, 1, '225', 'ریاضی', 1),
(2, 1, '300', 'زیست', 7),
(4, 1, '22', 'هندسه', 4),
(5, 10, '200', 'ریاضی', 1),
(6, 1, '120', 'ادبیات فارسی', 2);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `class_order_id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `field` int(11) NOT NULL,
  `class_name` varchar(256) NOT NULL,
  `class_link` varchar(256) NOT NULL,
  `time_start` varchar(256) NOT NULL,
  `time_end` varchar(256) NOT NULL,
  `days` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `class_order_id`, `class`, `grade`, `field`, `class_name`, `class_link`, `time_start`, `time_end`, `days`) VALUES
(1, 1, 101, 10, 1, 'چراز', 'https://ardaei.ir/redirect-to-room/1428', '7:55', '9:20', 'Monday'),
(2, 2, 101, 10, 1, 'فیزیک', 'https://ardaei.ir/redirect-to-room/1428', '9:30', '10:55', 'Monday'),
(3, 3, 101, 10, 1, 'نگارش', 'https://ardaei.ir/redirect-to-room/1428', '11:05', '12:30', 'Monday'),
(4, 4, 101, 10, 1, 'فیزیک', 'https://ardaei.ir/redirect-to-room/1428', '12:50', '14:15', 'Monday'),
(5, 1, 101, 10, 1, 'هندسه', 'https://ardaei.ir/redirect-to-room/1428', '07:55', '9:20', 'Tuesday'),
(6, 2, 101, 10, 1, 'عربی', 'https://ardaei.ir/redirect-to-room/1428', '09:30', '10:55', 'Tuesday'),
(7, 3, 101, 10, 1, 'هندسه', 'https://ardaei.ir/redirect-to-room/1428', '11:05', '12:30', 'Tuesday'),
(8, 4, 101, 10, 1, 'زبان سطح (D)', 'https://ardaei.ir/redirect-to-room/1428', '12:50', '14:15', 'Tuesday'),
(11, 1, 101, 10, 1, 'فیزیک', 'https://ardaei.ir/redirect-to-room/1428', '7:55', '9:20', 'Wednesday'),
(12, 2, 101, 10, 1, 'ریاضی', 'https://ardaei.ir/redirect-to-room/1428', '9:30', '10:55', 'Wednesday'),
(13, 3, 101, 10, 1, 'فیزیک', 'https://ardaei.ir/redirect-to-room/1428', '11:05', '12:30', 'Wednesday'),
(14, 4, 101, 10, 1, 'سواد رسانه', 'https://ardaei.ir/redirect-to-room/1428', '12:50', '14:15', 'Wednesday'),
(15, 1, 101, 10, 1, 'دینی', 'https://ardaei.ir/redirect-to-room/1428', '7:55', '9:20', 'Saturday'),
(16, 2, 101, 10, 1, 'ریاضی', 'https://ardaei.ir/redirect-to-room/1428', '9:30', '10:55', 'Saturday'),
(17, 3, 101, 10, 1, 'ورزش', 'https://ardaei.ir/redirect-to-room/1428', '11:05', '12:30', 'Saturday'),
(18, 4, 101, 10, 1, 'ریاضی', 'https://ardaei.ir/redirect-to-room/1428', '12:50', '14:15', 'Saturday'),
(19, 1, 101, 10, 1, 'شیمی', 'https://ardaei.ir/redirect-to-room/1428', '7:55', '9:20', 'Sunday'),
(20, 2, 101, 10, 1, 'فارسی', 'https://ardaei.ir/redirect-to-room/1428', '9:30', '10:55', 'Sunday'),
(21, 3, 101, 10, 1, 'شیمی', 'https://ardaei.ir/redirect-to-room/1428', '11:05', '12:30', 'Sunday'),
(22, 4, 101, 10, 1, 'ریاضی', 'https://ardaei.ir/redirect-to-room/1428', '12:50', '14:15', 'Sunday'),
(24, 1, 101, 10, 1, 'تست', 'تست', '7:55', '9:20', 'Friday'),
(25, 1, 101, 10, 1, 'تست', 'تست', '7:55', '9:20', 'Friday'),
(26, 1, 101, 10, 1, 'تست', 'تست', '7:55', '9:20', 'Friday'),
(27, 1, 101, 10, 1, 'تست', 'تست', '7:55', '9:20', 'Friday'),
(28, 1, 101, 10, 1, 'تست', 'تست', '00:00', '23:59', 'Friday');

-- --------------------------------------------------------

--
-- Table structure for table `study_hr`
--

CREATE TABLE `study_hr` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson` varchar(256) DEFAULT NULL,
  `count_time` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `family` varchar(256) NOT NULL,
  `mobile` varchar(256) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(256) NOT NULL DEFAULT 'defult.png',
  `activity` int(11) NOT NULL DEFAULT 1,
  `role` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_result`
--
ALTER TABLE `exam_result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_infos`
--
ALTER TABLE `extra_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homework`
--
ALTER TABLE `homework`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homework_status`
--
ALTER TABLE `homework_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pattern`
--
ALTER TABLE `pattern`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `study_hr`
--
ALTER TABLE `study_hr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `exam_result`
--
ALTER TABLE `exam_result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `extra_infos`
--
ALTER TABLE `extra_infos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `homework`
--
ALTER TABLE `homework`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `homework_status`
--
ALTER TABLE `homework_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pattern`
--
ALTER TABLE `pattern`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `study_hr`
--
ALTER TABLE `study_hr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
