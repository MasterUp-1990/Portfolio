export const fallback = {
  settings: {
    seoTitle: 'Alex Carter — Embedded & IoT Engineer',
    seoDescription:
      'Principal embedded & IoT engineer. Firmware, RTOS, PCB design and edge AI with 10+ years in the field.',
    name: 'Alex Carter',
    role: 'Principal Embedded & IoT Engineer',
    kicker: 'Embedded & IoT Engineer — 10+ years in the field',
    heroLines: ['FIRMWARE', 'THAT TALKS', 'TO METAL.'],
    heroIntro:
      'I architect deterministic firmware, bring up custom silicon and ship secure IoT fleets — from the first oscilloscope trace to a hundred thousand devices in the field.',
    marqueeSkills: [
      'C/C++', 'ARM CORTEX-M/R', 'FREERTOS & ZEPHYR RTOS', 'HARDWARE SCHEMATICS & PCB DESIGN',
      'CAN BUS & AUTOMOTIVE IOT', 'ZIGBEE, LORA & BLE MESH', 'EDGE AI (TINYML)', 'FPGA & VERILOG',
      'OSCILLOSCOPE SIGNAL ANALYSIS', 'RUST FOR EMBEDDED', 'SECURE BOOT & OTA', 'LOW-POWER DESIGN',
    ],
    location: 'San Francisco, CA',
    availability: 'Open to select contracts — Q1 2027',
    email: 'hello@alexcarter.dev',
    linkedin: '',
    github: '',
    resume: '/resume.pdf',
  },
  about: {
    heading: 'SILICON & STEEL',
    image: '/img/about.jpg',
    caption: 'FIG.01 — REV.C VALIDATION BENCH',
    paragraphs: [
      "I'm Alex Carter — an embedded systems architect with 10+ years building mission-critical hardware and firmware for aerospace, industrial automation, automotive and smart energy grids.",
      'My work lives at the lowest layers: hand-tuned interrupt service routines, memory-pool allocators measured in bytes, and PCB stackups engineered to survive factory floors, turbine nacelles and orbit-adjacent environments.',
      'I believe reliability is a design discipline, not an afterthought. Every board I ship is co-designed with its firmware, validated on real silicon, and hardened for zero-downtime field operation.',
    ],
    stats: [
      { value: '10+', label: 'Years in field' },
      { value: '120+', label: 'Boards brought up' },
      { value: '99.98%', label: 'Fleet uptime' },
      { value: '3', label: 'Hardware patents' },
    ],
    toolchain: ['arm-none-eabi-gcc 13.2', 'Zephyr SDK 0.16 / FreeRTOS 11', 'Altium Designer 24 / KiCad 8', 'Segger J-Link + Ozone', 'Saleae Logic Pro 16', 'Rigol MSO5000 / Tektronix MSO64'],
  },
  skills: [
    { title: 'Firmware Architectures & Real-Time OS', icon: 'cpu', accent: 'cyan', description: 'Bare-metal to RTOS: deterministic scheduling, DMA-driven pipelines and interrupt topology designed for hard real-time ceilings.', tags: ['FreeRTOS', 'Zephyr RTOS', 'Embedded C/C++17', 'STM32 CubeMX', 'ARM Cortex-M/R', 'Bare-Metal Drivers', 'DMA & Interrupts'] },
    { title: 'PCB Design & Schematics', icon: 'layers', accent: 'volt', description: 'High-speed layouts that pass EMI/EMC on the first spin.', tags: ['Altium Designer', 'KiCad', 'High-Speed Routing', 'EMI/EMC Compliance', '4–8 Layer Stackups', 'Impedance Matching'] },
    { title: 'IoT & Fieldbus Protocols', icon: 'radio', accent: 'mint', description: 'From silicon to the cloud — wired, wireless and everything between.', tags: ['CAN bus / J1939', 'Modbus RTU/TCP', 'LoRaWAN', 'BLE Mesh', 'Zigbee 3.0', 'MQTT/TLS', 'SPI / I2C / UART'] },
    { title: 'Hardware Debugging & Validation', icon: 'activity', accent: 'amber', description: 'Signal integrity is truth. Every claim is validated on the bench before it ships.', tags: ['Logic Analyzers', 'Oscilloscopes (Rigol/Tektronix)', 'JTAG / SWD Debugging', 'Power Profiling', 'RF Spectrum Analysis', 'HIL Testing'] },
    { title: 'Microcontrollers & SoC Platforms', icon: 'chip', accent: 'cyan', description: 'Hands-on bring-up across the silicon that powers modern devices — from 8-bit sensors to dual-core automotive MCUs and wireless SoCs.', tags: ['STM32 (F4 / H7 / L4 / G0)', 'ESP32 / ESP32-S3 / C3', 'nRF52840 / nRF5340', 'NXP i.MX RT / Kinetis', 'TI MSP430 / CC2652', 'Raspberry Pi RP2040', 'Microchip PIC / AVR', 'Renesas RA / RX', 'Silicon Labs EFR32', 'Infineon AURIX TC3xx', 'Lattice / Xilinx FPGA'] },
  ],
  projects: [
    {
      title: 'TitanGrid Industrial Edge Gateway', subtitle: 'Fault-tolerant substation telemetry node with dual CAN bus & LTE-M', image: '/img/prj1.jpg', images: ['/img/prj1.jpg', '/img/p6.jpg', '/img/p8.jpg'], captions: ['Rev.C gateway mainboard — STM32H7 core', 'RF front-end & LTE-M modem stage', 'Bench validation before field deployment'],
      description: 'Ultra-low power embedded gateway running Zephyr RTOS on STM32H7. Processes 5,000 sensor readings/sec with hardware AES-256 encryption and zero packet loss over 4G-LTE with LoRaWAN fallback.',
      tags: ['Zephyr RTOS', 'STM32H7', 'MQTT-SN', 'LTE-M'], link: '', featured: true,
      pinout: [{ pin: 'PA11/12', signal: 'FDCAN1_RX/TX', fn: 'Primary CAN bus — substation relays' }, { pin: 'PB12/13', signal: 'FDCAN2_RX/TX', fn: 'Redundant CAN bus' }, { pin: 'PD5/6', signal: 'USART2', fn: 'LTE-M modem AT link' }, { pin: 'PA5–7', signal: 'SPI1', fn: 'SX1262 LoRa transceiver' }, { pin: 'PC13', signal: 'EXTI13', fn: 'Tamper detect / watchdog kick' }],
    },
    {
      title: 'HaulSense CAN-FD Telematics ECU', subtitle: 'Automotive-grade ECU for autonomous heavy machinery fleets', image: '/img/prj2.jpg', images: ['/img/prj2.jpg', '/img/p5.jpg', '/img/scope.jpg'], captions: ['ECU logic board — dual-core Cortex-R5', 'CAN-FD transceiver & power input stage', 'J1939 bus timing captured on the scope'],
      description: 'ISO 26262-aware telematics ECU on a dual-core Cortex-R5. Decodes J1939 at 2,000 frames/sec, logs to eMMC with power-fail safety and streams fleet health over secure MQTT.',
      tags: ['Cortex-R5', 'CAN-FD / J1939', 'FreeRTOS', 'Secure OTA'], link: '',
      pinout: [{ pin: 'J1.3/4', signal: 'CANH/CANL', fn: 'Vehicle J1939 backbone' }, { pin: 'J1.7', signal: 'KL15', fn: 'Ignition sense & wake' }, { pin: 'U4.SDIO', signal: 'eMMC 8GB', fn: 'Power-fail safe logger' }, { pin: 'U7.UART', signal: 'GNSS', fn: 'u-blox F9P positioning' }],
    },
    {
      title: 'Sentinel TinyML Vibration Node', subtitle: 'Edge-AI predictive maintenance on a coin-cell budget', image: '/img/prj3.jpg', images: ['/img/prj3.jpg', '/img/p9.jpg', '/img/p7.jpg'], captions: ['nRF5340 sensor node — coin-cell build', 'Field-mounted on a pump bearing housing', 'Accelerometer front-end prototype'],
      description: 'nRF5340-based sensor node running a quantized 18 KB anomaly model. Detects bearing faults 3 weeks early while averaging 9 µA — five years on a single battery over BLE Mesh.',
      tags: ['nRF5340', 'TinyML', 'BLE Mesh', 'Zephyr'], link: '',
      pinout: [{ pin: 'P0.04', signal: 'SPI_SCK', fn: 'ADXL355 accelerometer' }, { pin: 'P0.08', signal: 'INT1', fn: 'FIFO watermark wake' }, { pin: 'P1.01', signal: 'ANT', fn: '2.4 GHz chip antenna' }, { pin: 'VDDH', signal: '3.0 V', fn: 'CR2477 coin cell' }],
    },
    {
      title: 'Meshline Smart-Grid Controller', subtitle: 'Zigbee / LoRa hybrid controller for distributed energy assets', image: '/img/prj4.jpg', images: ['/img/prj4.jpg', '/img/p10.jpg', '/img/p6.jpg'], captions: ['FPGA + Cortex-M4 controller board', 'Metering interface on the grid side', 'Zigbee / LoRa radio module bring-up'],
      description: 'Lattice FPGA + Cortex-M4 controller that synchronises 400+ inverters with sub-millisecond timing. Custom Verilog PWM core and Modbus bridge validated under IEC 61000 surge testing.',
      tags: ['FPGA / Verilog', 'Cortex-M4', 'Zigbee 3.0', 'Modbus'], link: '',
      pinout: [{ pin: 'FPGA.B4', signal: 'PWM_A[0:5]', fn: 'Gate drive outputs' }, { pin: 'PA9/10', signal: 'USART1', fn: 'RS-485 Modbus RTU' }, { pin: 'PB3', signal: 'PPS_IN', fn: 'GPS time sync' }, { pin: 'PC0', signal: 'ADC1', fn: 'Grid voltage sense' }],
    },
  ],
  experience: [
    { period: '2023 — Present', role: 'Principal Embedded Hardware Architect', company: 'Vortex Industrial Systems', location: 'San Francisco, CA', bullets: ['Architected next-gen redundant ECU firmware for autonomous heavy machinery.', 'Reduced MCU memory footprint by 42% through custom memory pool allocators in FreeRTOS.', 'Led a team of 6 firmware and PCB engineers across 4 hardware revisions.'], tags: ['FreeRTOS', 'STM32H7', 'CANopen', 'Altium', 'Rust'] },
    { period: '2020 — 2023', role: 'Senior IoT Systems Engineer', company: 'Kinetix Robotics & Sensing', location: 'Austin, TX', bullets: ['Designed ultra-low-power LoRaWAN sensor nodes for agriculture infrastructure.', 'Engineered a battery management system (BMS) with high-precision coulometric gas gauging.', 'Authored 3 hardware patents for high-noise industrial environment EMI filtering.'], tags: ['nRF52840', 'Zephyr', 'LoRaWAN', 'KiCad', 'Embedded C'] },
    { period: '2017 — 2020', role: 'Embedded Systems Firmware Developer', company: 'AeroDynamics Micro Labs', location: 'Seattle, WA', bullets: ['Developed low-level SPI and I2C drivers for aerospace telemetry avionics.', 'Performed hardware-in-the-loop (HIL) testing and oscilloscope signal validation.'], tags: ['ARM Cortex-M4', 'Bare-Metal C', 'Oscilloscope', 'JTAG', 'Python'] },
    { period: '2014 — 2017', role: 'Hardware Design Engineer', company: 'Helix Instruments', location: 'Boston, MA', bullets: ['Designed 4-layer mixed-signal boards for precision lab instrumentation.', 'Built FPGA-based data acquisition front-ends sampling at 250 MS/s.'], tags: ['Verilog', 'Xilinx', 'OrCAD', 'Mixed-Signal'] },
  ],
  education: [
    {
      period: '2012 — 2014',
      degree: 'M.S. Electrical & Computer Engineering',
      institution: 'Georgia Institute of Technology',
      location: 'Atlanta, GA',
      bullets: ['Thesis: deterministic scheduling for hard real-time sensor fusion on ARM Cortex-R platforms.', 'Graduate research assistant — automotive CAN bus security and in-vehicle gateway architectures.'],
      tags: ['Real-Time Systems', 'CAN Security', 'Cortex-R', 'Thesis'],
    },
    {
      period: '2008 — 2012',
      degree: 'B.S. Computer Engineering',
      institution: 'University of Michigan',
      location: 'Ann Arbor, MI',
      bullets: ['Capstone: FPGA-based motor control loop with sub-10 µs latency on Xilinx Spartan-6.', 'Teaching assistant for embedded systems lab (C, assembly, oscilloscope bring-up).'],
      tags: ['FPGA', 'Motor Control', 'Embedded C', 'Capstone'],
    },
  ],
};
