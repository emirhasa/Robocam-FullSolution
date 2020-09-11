
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ViewModels;

namespace DesktopAppUI
{
    public partial class MainForm : Form
    {
        static SerialPort _serialPort;
        public int Velocity { get; set; }
        HubConnection _connection { get; set; }
        public MainForm()
        {
            InitializeComponent();
            _serialPort = new SerialPort();
            _serialPort.PortName = "COM4";
            _serialPort.BaudRate = 19200;
            _serialPort.Open();
            Velocity = 50;
            _connection = null;
        }

        public static async Task SetInterval(Action action, TimeSpan timeout)
        {
            await Task.Delay(timeout).ConfigureAwait(false);

            action();

            SetInterval(action, timeout);
        }

        private async void buttonStart_Click(object sender, EventArgs e)
        {

#if DEBUG
            var hubConnection = new HubConnectionBuilder()
            .WithUrl("https://localhost:44358/centralHub")
            .Build();
#endif

            var hubConnection = new HubConnectionBuilder()
            .WithUrl("https://robocam2.brodev.info/centralHub")
            .Build();


            _connection = hubConnection;

            _connection.On<string, string>("ReceiveCommand", (message, value) =>
            {
                //s - stop f - forward l - left r - right b - backward
                switch(message)
                {
                    case "stop":
                        clearButtons();
                        _serialPort.Write("s");
                        break;
                    case "up":
                        buttonUp.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("f");
                        break;
                    case "left":
                        buttonLeft.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("l");
                        break;
                    case "right":
                        buttonRight.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("r");
                        break;
                    case "down":
                        buttonDown.BackColor = Color.DeepSkyBlue;
                        _serialPort.Write("b");
                        break;
                    case "aOn":
                        checkBoxAnalogue.Checked = true;
                        labelVelocity.Visible = true;
                        labelVelocityValue.Visible = true;
                        _serialPort.Write("a");
                        break;
                    case "aOff":
                        checkBoxAnalogue.Checked = false;
                        labelVelocity.Visible = false;
                        labelVelocityValue.Visible = false;
                        _serialPort.Write("d");
                        break;
                    case "v":
                        labelVelocityValue.Text = value;
                        var speed = int.Parse(value);
                        if(speed > 0 && speed <= 24)
                        {
                            _serialPort.Write("1");
                        }
                        if (speed >= 25 && speed <= 49)
                        {
                            _serialPort.Write("2");
                        }
                        if (speed >= 50 && speed <= 74)
                        {
                            _serialPort.Write("3");
                        }
                        if (speed >=75 && speed <=99)
                        {
                            _serialPort.Write("4");
                        }
                        if (speed == 100)
                        {
                            _serialPort.Write("5");
                        }
                        break;
                    default:
                        break;
                }
            });

            await hubConnection.StartAsync();
            MessageBox.Show("Listening");
        }

        private void clearButtons()
        {
            buttonLeft.BackColor = default;
            buttonUp.BackColor = default;
            buttonRight.BackColor = default;
            buttonDown.BackColor = default;
        }

        private async Task serialPort_CheckDataReceived()
        {
            string serialBuffer = _serialPort.ReadExisting();

            if(!string.IsNullOrEmpty(serialBuffer))
            {
                _serialPort.DiscardOutBuffer();
                _serialPort.DiscardInBuffer();

                var latestDataIndex = serialBuffer.LastIndexOf("H");
                var lastSensorData = serialBuffer.Substring(latestDataIndex);

                var humidity = lastSensorData.Substring(1, lastSensorData.IndexOf("T") - 1);
                var temperature = lastSensorData.Substring(
                    lastSensorData.IndexOf("T") + 1, lastSensorData.IndexOf("G") - lastSensorData.IndexOf("T") - 1
                    );
                var gasLevel = lastSensorData.Substring(
                    lastSensorData.IndexOf("G") + 1, lastSensorData.IndexOf("E") - lastSensorData.IndexOf("G") - 1
                    );

                await SendSensorData(new SensorDataVM
                {
                    Temperature = int.Parse(temperature),
                    Humidity = int.Parse(humidity),
                    GasLevel = int.Parse(gasLevel)
                });
            }
        }


        private async Task SendSensorData(SensorDataVM data)
        {
            await _connection.InvokeAsync("SendSensorData", data);
        }

        private async void buttonSensors_Click(object sender, EventArgs e)
        {
            await SetInterval(async () => await serialPort_CheckDataReceived(), TimeSpan.FromSeconds(1));
        }
    }   
}
