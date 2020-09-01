using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DesktopAppUI
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }

	//private void button2_Click(object sender, EventArgs e)
	//{
	//	serialPort1.Open();
	//	serialPort1.Write("#START\n");
	//}

	//private void button3_Click(object sender, EventArgs e)
	//{
	//	var result = "http://localhost:61106/api/Values".GetJsonAsync<dynamic>().Result;
	//	serialPort1.WriteLine(result);
	//	//serialPort1.DiscardOutBuffer();
	//	//serialPort1.DiscardInBuffer();
	//}
	//private void serialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
	//{
	//	string s = serialPort1.ReadExisting();//reads the serialport buffer
	//										  //if (s.StartsWith("Kom:"))//checks if it is status
	//	{
	//		this.BeginInvoke((Action)delegate () { label1.Text = ("vraceni podaci: " + s); });
	//	}
	//	/*else
	//	{
	//		this.BeginInvoke((Action)delegate() { label1.Text = ("vraceni podaci- " + s); });

	//	}*/
	//	//serialPort1.DiscardOutBuffer();
	//	//serialPort1.DiscardInBuffer();
	//}
}
